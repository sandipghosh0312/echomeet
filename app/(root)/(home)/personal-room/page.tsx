"use client"

import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useGetCallById } from '@/hooks/useGetCallByid';
import { useUser } from '@clerk/nextjs';
import { useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const Table = ({ title, description }: { title: string; description: string; }) => (
  <div className='flex flex-col items-start gap-2 xl:flex-row'>
    <h1 className='text-base font-bold text-sky-1 lg:text-xl xl:mix-w-32'>{`${title}: `}</h1>
    <h1 className='truncate text-sm max-sm:max-w-[320px] lg:text-xl'>{description}</h1>
  </div>
)



const PersonalRoom = () => {
  const { user, isLoaded: isUserLoaded } = useUser();
  const meetingId = user?.id;
  const meetingLink = `echomeet-six.vercel.app/meeting/${meetingId}?/personal=true`;
  const { toast } = useToast();
  const client = useStreamVideoClient();
  const { calls } = useGetCallById(meetingId || "");
  const router = useRouter();

  const startRoom = async () => {
    if (!client || !meetingId) {
      toast({ title: "Error", description: "Meeting ID or client not available." });
      return;
    }

    try {
      if (!calls) {
        const newCall = client.call("default", meetingId);

        await newCall.getOrCreate({
          data: {
            starts_at: new Date().toISOString(),
          },
        });

        router.push(`/meeting/${meetingId}?/personal=true`)

        toast({ title: "Success", description: "Meeting started successfully." });
      } else {
        toast({ title: "Notice", description: "Meeting is already active." });
        router.push(`/meeting/${meetingId}?/personal=true`)
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to start the meeting. Please try again." });
      console.error(error);
    }
  };

  useEffect(() => {
    if (!isUserLoaded) {
      toast({ title: "Loading user data..." });
    }
  }, [isUserLoaded, toast]);


  return (
    <section className='flex size-full flex-col gap-10 text-white'>
      <h1 className='text-3xl font-bold'>Personal Room</h1>

      <div className='flex w-full flex-col gap-8 xl:max-w-[900px]'>
        <Table title="Topic" description={`${user?.username}'s Meeting room`} />
        <Table title="Meeting Id" description={meetingId!} />
        <Table title="Invitaion Link" description={meetingLink} />
      </div>
      <div className='flex gap-5'>
        <Button onClick={startRoom} className='bg-blue-1'>
          Start Meeting
        </Button>
        <Button onClick={() => {
          navigator.clipboard.writeText(meetingLink);
          toast({ title: "Meeting Link copied!" })
        }} className='bg-dark-3'>
          Copy Meeting Id
        </Button>
      </div>
    </section>
  )
}

export default PersonalRoom
