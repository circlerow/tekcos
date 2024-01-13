
import { IMessage } from '@/interface'
import React from 'react'

const MyMessage = (props: IMessage) => {
    const { message } = props
    return (
        <div className='flex mr-1 my-2'>
            <div className='text-right w-auto bg-blue-600 ml-auto py-1.5 px-3 rounded-full text-xl'>
                {message}
            </div>
        </div>
    )
}

export default MyMessage