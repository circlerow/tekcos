import React from 'react'
import avatar from '../public/avatar.png'
import { IConversation } from '@/interface'

const Conversation = (props: IConversation) => {
    const { startConversation, id, name } = props

    return (
        <div className='w-full h-1/6'>
            <div className='w-full h-5/6 m-auto flex items-center relative cursor-pointer' onClick={(e) => startConversation(id)}>
                <div className='h-5/6 w-[22%] absolute rounded-full ml-[5%]'
                    style={{ backgroundImage: `url(${avatar.src})`, backgroundSize: 'cover' }} >
                </div>
                <div className='bg-blue-700 h-4/6 w-4/5 ml-[10%] mx-auto rounded-2xl hover:bg-blue-800'>
                    <h2 className='ml-[25%] mx-auto mt-3 text-3xl'>{name}</h2>
                    <p className='ml-[25%] mx-auto text-xs'>{id}</p>
                </div>
            </div>
        </div >
    )
}

export default Conversation