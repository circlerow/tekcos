/* eslint-disable @next/next/no-img-element */
import { IMessage } from '@/interface'
import Image from 'next/image'
import React from 'react'

const YourMessage = (props: IMessage) => {
    const { message } = props
    const url = 'http://localhost:2601/files/avatar-1705069330132-932386435.jpeg'
    return (
        <div className='flex ml-1 my-2'>
            <img src={url} alt={''} height={36} width={36}
                style={{ borderRadius: "100px", marginRight: "4px" }} />
            <div className='text-left w-auto bg-slate-600 mr-auto py-1.5 px-3 rounded-full text-xl'>
                {message}
            </div>
        </div>
    )
}

export default YourMessage