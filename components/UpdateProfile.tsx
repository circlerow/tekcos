/* eslint-disable @next/next/no-img-element */
'use client'
import { MessageTwoTone } from '@ant-design/icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Space } from 'antd'
import Link from 'next/link'
import React from 'react'
import {
    faGear,
} from "@fortawesome/free-solid-svg-icons";
import { Menu, MenuButton, MenuItem, MenuList, Flex, MenuGroup, MenuDivider } from '@chakra-ui/react';

const user = {
    name: 'John Doe',
    avatar: 'http://localhost:2601/files/avatar-1705069330132-932386435.jpeg',
    phoneNumber: '081234567890',
    address: 'Jl. Raya Bogor, No. 1, Jakarta Timur',
    birthday: '12-01-2024',
    description: 'Lorem ipsum dolor sit am',
}




const Profile = () => {
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
                            <img src={user.avatar} alt='avatar' className='rounded-full w-[200px] h-[200px]' />
                            <div>
                                <h1 className='text-[70px] text-black font-bold ml-4'>{user.name}</h1>
                                <div className='flex ml-3'>
                                    <h1 className='font-header text-[20px]  text-gray-600'>Phone Number:</h1>
                                    <p className='ml-3 font-body text-[20px] text-black'>{user.phoneNumber}</p>
                                </div>
                                <div className='flex ml-3'>
                                    <h1 className='font-header text-[20px] text-gray-600'>Address:</h1>
                                    <p className='ml-3 font-body text-[20px] text-black'>{user.address}</p>
                                </div>
                                <div className='flex ml-3'>
                                    <h1 className='font-header text-[20px] text-gray-600'>Birthday:</h1>
                                    <p className='ml-3 font-body text-[20px] text-black'>{user.birthday}</p>
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
                            <p className='font-body text-[18px] text-black'>{user.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile