"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import HomeCard from './HomeCard'
import { useRouter } from 'next/navigation'
import MeetingModal from './MeetingModal'
import { useUser } from '@clerk/nextjs'
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useToast } from "@/hooks/use-toast"
import { Textarea } from './ui/textarea'
import ReactDatePicker from "react-datepicker";
import { Input } from './ui/input'

const MeetingTypeList = () => {
    const [meetingState, setMeetingState] = useState<'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined>();
    const router = useRouter();
    const { user } = useUser();
    const client = useStreamVideoClient();
    const [values, setvalues] = useState({
        dateTime: new Date(),
        description: "",
        link: "",
    });
    const [callDetails, setCallDetails] = useState<Call>();
    const { toast } = useToast()

    const createMeeting = async () => {
        if (!client || !user) return;

        try {
            if (!values.dateTime) toast({ title: "Please select a date and time" });

            const id = crypto.randomUUID();
            const call = client.call('default', id);

            if (!call) throw new Error("Failed to create call");

            const startsAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString();
            const description = values.description || user?.firstName + "'s meeting room";
            await call.getOrCreate({
                data: {
                    starts_at: startsAt,
                    custom: {
                        description,
                    }
                }
            })
            setCallDetails(call);

            if (!values.description) {
                router.push(`/meeting/${call.id}`);
                toast({ title: "Meeting created successfully" })
            }
        } catch (error) {
            toast({ title: "Failed to create meeting" })
        }
    }

    const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`
    return (
        <section className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4'>
            <HomeCard background="/icons/add-meeting.svg" title="New Meeting" description="Start an instant meeting" handleClick={() => setMeetingState('isInstantMeeting')} className="bg-orange-1" />
            <HomeCard background="/icons/schedule.svg" title="Schedule Meeting" description="Plan your meeting" handleClick={() => setMeetingState('isScheduleMeeting')} className="bg-blue-1" />
            <HomeCard background="/icons/recordings.svg" title="View Recordings" description="Checkout your recorded meetings" handleClick={() => router.push("/recordings")} className="bg-purple-1" />
            <HomeCard background="/icons/join-meeting.svg" title="Join Meeting" description="Join a meeting using the join link" handleClick={() => setMeetingState('isJoiningMeeting')} className="bg-yellow-1" />
            {
                !callDetails ? (
                    <MeetingModal
                        isOpen={meetingState === 'isScheduleMeeting'}
                        onClose={() => setMeetingState(undefined)}
                        text="Schedule a meeting"
                        handleClick={createMeeting}
                        buttonText='Schedule Meeting'
                    >
                        <div className='flex flex-col gap-2.5'>
                            <label className='text-base text-normal leading=[22px] text-sky-2'>Add a description</label>
                            <Textarea className='border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0' onChange={(e) => setvalues({ ...values, description: e.target.value })} />
                        </div>
                        <div className='flex flex-col gap-2.5'>
                            <label className='text-base text-normal leading=[22px] text-sky-2'>Choose the date and time</label>
                            <ReactDatePicker selected={values.dateTime} onChange={(date) => setvalues({...values, dateTime: date!})} showTimeSelect timeFormat='HH:mm' timeCaption='Time' dateFormat="MMMM d, yyyy h:mm aa" className='w-full rounded bg-dark-3 p-2 focus:outline-none'/>
                        </div>
                    </MeetingModal>
                ) : (
                    <MeetingModal
                        isOpen={meetingState === 'isScheduleMeeting'}
                        onClose={() => setMeetingState(undefined)}
                        text="Meeting Created!"
                        buttonText="Copy Meeting Link"
                        className="text-center"
                        handleClick={() => {
                            navigator.clipboard.writeText(meetingLink)
                            toast({ title: "Link copied!" })
                        }}
                        image='/icons/checked.svg'
                        buttonIcon='/icons/copy.svg'
                    />
                )
            }
            <MeetingModal
                isOpen={meetingState === 'isInstantMeeting'}
                onClose={() => setMeetingState(undefined)}
                text="Start a new meeting right away"
                buttonText="Start Meeting"
                className="text-center"
                handleClick={() => createMeeting()}
            />

            <MeetingModal
                isOpen={meetingState === 'isJoiningMeeting'}
                onClose={() => setMeetingState(undefined)}
                text="Join a Meeting"
                buttonText="Join Meeting"
                className="text-center"
                handleClick={() => router.push(values.link)}
            >
                <Input placeholder='Meeting Link' className='border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0' onChange={(e) => setvalues({ ...values, link: e.target.value })} />
            </MeetingModal>
        </section>
    )
}

export default MeetingTypeList