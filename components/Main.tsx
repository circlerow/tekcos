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
import "@/app/globals.css"

const Main = () => {
    const [message, setMessage] = useState('');
    const [userData, setUserData] = useState<IUserData>();
    const [allUsers, setAllUsers] = useState([]);
    const [conversation, setConversation] = useState<any>([]);
    const [conversationId, setConversationId] = useState<IConversationId | null>(null);
    const [toUserId, setToUserId] = useState('');
    const [visibleMessages, setVisibleMessages] = useState(20);
    const [avatar, setAvatar] = useState('');


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

    const loadMoreMessages = () => {
        setVisibleMessages(prevVisibleMessages => prevVisibleMessages + 20);
    };

    useEffect(() => {
        socket.on('message-received', (message: any) => {
            if (message.toUserId === userData?.id) {
                setConversation([{ content: message.message, isMine: false, createAt: Date.now(), }, ...conversation]);
            }
        });
    }
        , [conversation, userData?.id])


    const getMessages = async (userId: string) => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const header = getHeaders(accessToken);
            const resCurrentConversation = await axios.get(`http://localhost:2601/conversation/${userId}`, header)
            const avatar = await axios.get(`http://localhost:2601/user-info/avatar/${userId}`, header)
            console.log(avatar)
            setAvatar(avatar.data)
            setConversation(resCurrentConversation.data.messages);
            setConversationId(resCurrentConversation.data.conversationId)
            setToUserId(userId);
        }
        catch (error) {
            console.log(error)
        }
    }

    const handleChange = (event: any) => {
        setMessage(event.target.value);
    };

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userId');
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
        setConversation([{ content: message, isMine: true, createAt: Date.now(), from: userData?.id, fromUserId: userData?.id, toUserId: toUserId }, ...conversation]);
        socket.emit(topicEmit, {
            message: message,
            fromUserId: userData ? userData.id : '',
            toUserId: toUserId,
            conversationId: conversationId,
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
                                <h1 className='font-bold '>Tekcos Chat</h1>
                            </div>
                        </Space>
                    </div>
                    {userData && <div className='m-auto font-bold text-xl'>
                        Welcome to Tekcos Chat,{userData.name} !!!
                    </div>}
                    {userData?.hasInfo ? <Link href='/profile'>
                        <div className="header-guest__login mr-5 mt-2.5">
                            <img src="/user-avatar.svg" alt="An SVG of an eye" className='svg' />
                        </div>
                    </Link>
                        : <Link href='/create-profile'>
                            <div className="header-guest__login mr-5 mt-2.5">
                                <img src="/user-avatar.svg" alt="An SVG of an eye" className='svg' />
                            </div>
                        </Link>}
                    <div className='my-auto mr-4 header-guest__login'>
                        <a href="/login" className='font-header text-[18px] hover:text-gray-200 underline' onClick={handleLogout}>Log Out</a>
                    </div>
                </div>
                <div className='overlay-main bg-gradient-to-r from-violet-500 to-fuchsia-500'>
                    <div className='flex flex-wrap main'>
                        <div className='h-full bg-blue-100 w-1/5 border-2 border-black overflow-auto'>
                            {allUsers.map((user: IUserData) => {
                                return (
                                    <Conversation key={user.id} name={user.name} id={user.id} avatar={user.avatar} lastMessage={user.lastMessage} startConversation={getMessages} />
                                )
                            })}
                        </div>
                        <div className='h-full bg-blue-100 w-4/5 border-2 border-black'>
                            <div className='h-19/20 overflow-auto flex flex-col-reverse'>
                                {conversation.slice(0, visibleMessages).map((message: { isMine: any; content: string }, index: React.Key | null | undefined) => {
                                    if (message.isMine) {
                                        return <MyMessage key={index} message={message.content} />;
                                    } else {
                                        return <YourMessage key={index} message={message.content} avatar={avatar} />;
                                    }
                                })}
                                {visibleMessages < conversation.length && (
                                    <button onClick={loadMoreMessages} className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'>Load More</button>
                                )}
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