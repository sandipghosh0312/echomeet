"use client"

import Loader from '@/components/Loader';
import MeetingRoom from '@/components/MeetingRoom';
import MeetingSetup from '@/components/MeetingSetup';
import { useGetCallById } from '@/hooks/useGetCallByid';
import { useUser } from '@clerk/nextjs'
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk';
import { useParams } from 'next/navigation';
import React, { useState } from 'react'

const Meeting = () => {
  const { id } = useParams();
  const { isLoaded } = useUser();
  const [isSetUpComplete, setIsSetUpComplete] = useState(false)
  const { calls, iscallLoading } = useGetCallById(id as string);
  if  (!isLoaded || iscallLoading) return <Loader />;
  return (

    <main className='h-screen w-full'>
      <StreamCall call={calls}>
        <StreamTheme>
          {!isSetUpComplete ? (
            <MeetingSetup setIsSetUpComplete={setIsSetUpComplete}/>
          ): (
            <MeetingRoom />
          )}
        </StreamTheme>
      </StreamCall>
    </main>
  )
}

export default Meeting