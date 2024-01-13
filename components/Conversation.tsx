/* eslint-disable @next/next/no-img-element */
import React from 'react'
import avatar from '../public/avatar.png'
import { IConversation } from '@/interface'

const Conversation = (props: IConversation) => {
    const url = 'http://localhost:2601/files/avatar-1705069330132-932386435.jpeg'
    const { startConversation, id, name } = props

    return (
        <div className='w-full h-1/6'>
            <div className='w-full h-5/6 m-auto flex items-center relative cursor-pointer' onClick={(e) => startConversation(id)}>
                <div className='bg-blue-700 h-[90%] w-[95%] ml-[2.5%] rounded-full hover:bg-blue-800 flex overflow-hidden '>
                    <img src={url} alt='avatar' className='rounded-full w-[100px] h-[100px]' />
                    <h2 className='pl-5 my-auto text-4xl'>{name}</h2>
                </div>
            </div>
        </div >
    )
}

export default Conversation