/* eslint-disable @next/next/no-img-element */
'use client'

import { MessageTwoTone, SendOutlined } from '@ant-design/icons'
import { Button, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import Conversation from './Conversation'
import { MyMessage, YourMessage } from '.'
import axios from 'axios'
import { socket } from '@/utils/socket'
import { currentCoversation, enter, getAllUserUrl, topicEmit, userDataUrl } from '@/enum'
import { IConversationId, IMessageConversation, IUserData } from '@/interface'
import { getHeaders, postUrl } from '@/utils/utils'
import Link from 'next/link'

const Main = () => {
    const [message, setMessage] = useState('');
    const [userData, setUserData] = useState<IUserData | null>(null);
    const [allUsers, setAllUsers] = useState([]);
    const [conversation, setConversation] = useState<any>([]);
    const [conversationId, setConversationId] = useState<IConversationId | null>(null);
    const [toUserId, setToUserId] = useState('');


    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        const header = getHeaders(accessToken);
        try {
            axios.get(getAllUserUrl, header)
                .then((response) => { setAllUsers(response.data) })

            axios.get(userDataUrl, header)
                .then((response) => { setUserData(response.data) })
        }
        catch (error) {
            console.log(error)
        }
    }
        , [])

    useEffect(() => {
        socket.on('message-received', (message: any) => {
            if (message.toUserId === userData?._id) {
                console.log(message)
                setConversation([{ message: message.message, isMine: false }, ...conversation]);
            }
        });
    }
        , [conversation, userData?._id])


    const getMessages = async (userId: string) => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const header = getHeaders(accessToken);
            const resCurrentConversation = await postUrl(currentCoversation, { userId: userId }, header);

            setConversation(resCurrentConversation.messages);
            setConversationId(resCurrentConversation.conversationId)
            setToUserId(userId);
        }
        catch (error) {
            console.log(error)
        }
    }

    const handleChange = (event: any) => {
        setMessage(event.target.value);
    };

    const handleKeyPress = (event: any) => {
        if (event.key === enter) {
            sendMessage(event);
        }
    }

    const sendMessage = (event: any) => {
        event.preventDefault();
        if (!message) {
            return;
        }
        setConversation([{ message: message, isMine: true }, ...conversation]);
        socket.emit(topicEmit, {
            message: message,
            fromUserId: userData ? userData._id : '',
            toUserId: toUserId,
            userConversationId: conversationId,
        });
        setMessage('');
    };

    return (
        <>
            <div className='h-screen'>
                <div className='bg-indigo-600 flex h-[6vh] justify-between'>
                    <div>
                        <Space className='h-full'>
                            <div className='mb-0.5 ml-2 text-[45px] font-header flex'>
                                <MessageTwoTone className='my-3 mr-1' />
                                <h1 className='font-bold'>Tekcos Chat</h1>
                            </div>
                        </Space>
                    </div>
                    {userData && <div className='m-auto font-bold text-xl'>
                        Welcome to Tekcos Chat,{userData.name} !!!
                    </div>}
                    <Link href='/profile'>
                        <div className="header-guest__login mr-5 mt-2.5">
                            <img src="/user-avatar.svg" alt="An SVG of an eye" className='svg' />
                        </div>
                    </Link>
                    <div className='my-auto mr-4 header-guest__login'>
                        <a href="/login" className='font-header text-[18px] hover:text-gray-200 underline'>Log Out</a>
                    </div>
                </div>
                <div className='overlay-main bg-gradient-to-r from-violet-500 to-fuchsia-500'>
                    <div className='flex flex-wrap main'>
                        <div className='h-full bg-blue-100 w-1/5 border-2 border-black overflow-auto'>
                            {allUsers.map((user: IUserData) => {
                                return (
                                    <Conversation key={user._id} name={user.name} id={user._id} startConversation={getMessages} />
                                )
                            })}
                        </div>
                        <div className='h-full bg-blue-100 w-4/5 border-2 border-black'>
                            <div className='h-19/20 overflow-auto flex flex-col-reverse'>
                                {conversation.map((message: IMessageConversation, index: number) => {
                                    if (message.isMine) {
                                        return <MyMessage key={index} message={message.message} />
                                    } else {
                                        return <YourMessage key={index} message={message.message} />
                                    }
                                })}
                            </div>
                            <div className='h-1/20'>
                                <input type="text" id='message' name='message' placeholder='Aa' onChange={handleChange} value={message} onKeyPress={handleKeyPress}
                                    className='w-11/12 h-full border-2 text-neutral-950 border-pink-500 rounded-full pl-5' />
                                <button className='bg-blue-500 w-1/12 h-full rounded-full' type="submit" onClick={sendMessage}>
                                    <SendOutlined style={{ fontSize: '23px', color: "#fff" }} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Main