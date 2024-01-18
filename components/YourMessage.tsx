/* eslint-disable @next/next/no-img-element */
import { IMessage } from '@/interface'
import Image from 'next/image'
import React from 'react'

const YourMessage = (props: IMessage) => {
    const { message, avatar } = props
    const url = 'http://localhost:2601/files/default.png'
    const avatar2 = avatar ? avatar : url
    return (
        <div className='flex ml-1 my-2'>
            <img src={avatar2} alt={''} height={36} width={36}
                style={{ borderRadius: "100px", marginRight: "4px" }} />
            <div className='text-left w-auto bg-slate-600 mr-auto py-1.5 px-4 rounded-full text-xl'>
                {message}
            </div>
        </div>
    )
}

export default YourMessage