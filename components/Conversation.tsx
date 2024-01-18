/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { IConversation } from '@/interface'
import "@/app/globals.css"

const Conversation = (props: IConversation) => {
    const url = 'http://localhost:2601/files/default.png'
    const { startConversation, id, name, lastMessage, avatar } = props
    const avatar2 = avatar ? avatar : url
    let lastMessage2 = props.lastMessage
    if (lastMessage?.length > 10) lastMessage2 = lastMessage?.slice(0, 10) + '...'
    return (
        <div className='w-full h-1/6'>
            <div className='w-full mt-1 h-5/6 m-auto items-center relative cursor-pointer' onClick={(e) => startConversation(id)}>
                <div className='bg-blue-700 h-[90%] w-[95%] ml-[2.5%] rounded-full hover:bg-blue-800 flex overflow-hidden '>
                    <img src={avatar2} alt='avatar' className='rounded-full w-[100px] h-[100px]' />
                    <div className='my-auto'>
                        <h2 className='pl-5 my-auto text-4xl font-bold'>{name}</h2>
                        <p className='pl-5 my-auto text-xl text-yellow-200'>{lastMessage2}</p>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Conversation