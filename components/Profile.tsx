/* eslint-disable @next/next/no-img-element */
'use client'
import { MessageTwoTone } from '@ant-design/icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Space } from 'antd'
import Link from 'next/link'
import React, { use, useEffect, useState } from 'react'
import {
    faGear,
} from "@fortawesome/free-solid-svg-icons";
import { Menu, MenuButton, MenuItem, MenuList, Flex, MenuGroup, MenuDivider } from '@chakra-ui/react';
import axios from 'axios'
import { url } from '@/enum'
import { convertToDate } from '@/utils/utils'


const Profile = () => {
    const [userData, setUserData] = useState<any>();

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        try {
            axios.get(`${url}/user-info/${userId}`)
                .then((response) => { setUserData(response.data) })
        }
        catch (error) {
            console.log(error)
        }
    }
        , [])
    
    return (
        <>
            <div className='h-screen'>
                <div className='bg-indigo-600 flex h-[6vh] justify-between'>
                    <div>
                        <Link href='/'>
                            <Space className='h-full'>
                                <div className='mb-0.5 ml-2 text-[45px] font-header flex'>
                                    <MessageTwoTone className='my-3 mr-1' />
                                    <h1 className='font-bold'>Tekcos Chat</h1>
                                </div>
                            </Space>
                        </Link>
                    </div>
                    <div className='my-auto mr-4 header-guest__login'>
                        <a href="/login" className='font-header text-[18px] hover:text-gray-200 underline'>Log Out</a>
                    </div>
                </div>
                <div className='overlay bg-gradient-to-r from-violet-500 to-fuchsia-500'>
                    <div className='profile'>
                        <div className='flex'>
                            <img src={userData?.avatar} alt='avatar' className='rounded-full w-[200px] h-[200px]' />
                            <div>
                                <h1 className='text-[70px] text-black font-bold ml-4'>{userData?.name}</h1>
                                <div className='flex ml-3'>
                                    <h1 className='font-header text-[20px]  text-gray-600'>Phone Number:</h1>
                                    <p className='ml-3 font-body text-[20px] text-black'>{userData?.phoneNumber}</p>
                                </div>
                                <div className='flex ml-3'>
                                    <h1 className='font-header text-[20px] text-gray-600'>Address:</h1>
                                    <p className='ml-3 font-body text-[20px] text-black'>{userData?.address}</p>
                                </div>
                                <div className='flex ml-3'>
                                    <h1 className='font-header text-[20px] text-gray-600'>Birthday:</h1>
                                    <p className='ml-3 font-body text-[20px] text-black'>{convertToDate(userData?.birthday)}</p>
                                </div>
                            </div>
                            <div className='setting ml-auto mr-1 text-black'>
                                <Menu>
                                    <MenuButton>
                                        <div className="header-guest__login">
                                            <FontAwesomeIcon icon={faGear} style={{ fontSize: 30, color: "black" }} className='icon' />
                                        </div>
                                    </MenuButton>
                                    <MenuList className='bg-slate-400 p-3 rounded-lg text-center'>
                                        <Link href='/update-profile'>
                                            <MenuItem>Edit Profile</MenuItem>
                                        </Link>
                                    </MenuList>
                                </Menu>
                            </div>
                        </div>
                        <div className='profile__info mt-5 ml-3'>
                            <h1 className='font-header text-[20px] text-black font-bold'>Description:</h1>
                            <p className='font-body text-[18px] text-black'>{userData?.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile