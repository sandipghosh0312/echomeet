import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogTitle,
} from "@/components/ui/dialog"
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';


interface MeetingModalProps {
    isOpen: boolean,
    onClose: () => void;
    text: string;
    buttonText?: string;
    children?: React.ReactNode;
    handleClick?: () => void;
    buttonIcon?: string;
    image?: string;
    className?: string;
}

const MeetingModal = ({ isOpen, onClose, text, buttonText, children, handleClick, buttonIcon, image, className }: MeetingModalProps) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogTitle>
                
            </DialogTitle>
            <DialogContent className='flex w-full max-w-[520px] flex-col gap-6 border-none bg-dark-1 px-6 py-9 text-white'>
                 <div className='flex flex-col gap-6'>
                    {image && (
                        <div className='flex justify-center'>
                            <Image src={image} alt="Image" width={72} height={72} />
                        </div>
                    )}
                    <h1 className={cn("text-3xl font-bold leading-[42px]", className)}>{text}</h1>
                    {children}
                    <Button className='bg-blue-1 focus-visible:ring-offset-0' onClick={handleClick}>
                        {buttonIcon && (
                            <Image src={buttonIcon} alt="Button Icon" width={13} height={13}/>
                        )} &nbsp;
                        {buttonText}
                    </Button>
                 </div>
            </DialogContent>
        </Dialog>

    )
}

export default MeetingModal