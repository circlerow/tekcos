/* eslint-disable @next/next/no-img-element */
'use client'
import { MessageTwoTone } from '@ant-design/icons'
import { CalendarIcon, CheckIcon, HomeIcon, PhoneIcon } from '@heroicons/react/20/solid'
import { Space, notification } from 'antd'
import Link from 'next/link'
import React, { use, useEffect, useState } from 'react'
import { Input } from "@material-tailwind/react";
import axios from 'axios'
import { getHeaders, sleep } from '@/utils/utils'
import { createProfileSuccessfully, success } from '@/enum'
import { openNotification } from '@/utils/notification'
import { useRouter } from 'next/navigation'


const CreateProfile = () => {
    const [api, contextHolder] = notification.useNotification();
    const [avatarUrl, setAvatarUrl] = useState("http://localhost:2601/files/default.png");
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [birthday, setBirthday] = useState('');
    const [description, setDescription] = useState('');
    const router = useRouter();

    const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            if (file.type.startsWith('image/')) {
                const tempUrl = URL.createObjectURL(file);
                setAvatarUrl(tempUrl);
                setAvatarFile(file);
            }
        }
    };

    const handleSubmit = () => {
        const formData = new FormData();
        const accessToken = localStorage.getItem('accessToken');
        const userId = localStorage.getItem('userId');
        if (avatarFile) {
            formData.append('avatar', avatarFile);
        }
        formData.append('phoneNumber', phoneNumber);
        formData.append('address', address);
        formData.append('birthday', birthday);
        formData.append('description', description);
        formData.append('userId', userId!);
        const header = getHeaders(accessToken);

        axios.post('http://localhost:2601/user-info/create', formData, header)
            .then(async (response) => {
                if (response.status === 201) {
                    openNotification(api, success, createProfileSuccessfully)
                    await sleep(2000)
                    router.push('/');
                }
            })
            .catch((error) => {
                console.log(error)
            });

    };


    return (
        <>
            <div className='h-screen'>
                {contextHolder}
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
                    <div className='create-profile'>
                        <h1 className='text-[50px] text-black font-bold ml-4 text-center'>Create Your Profile</h1>
                        <div className="flex ml-4 mt-3">
                            <h4 className="text-[24px] text-black">Phone Number:</h4>
                            <div className="relative ml-2">
                                <input
                                    type="tel"
                                    className="py-2 px-3 w-full rounded-full border border-blue-300 focus:outline-none focus:ring focus:border-blue-600 text-black"
                                    placeholder="Phone number"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                />
                                <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                                    <PhoneIcon className="h-5 w-5 text-gray-400" />
                                </div>
                            </div>
                        </div>
                        <div className="flex ml-4 mt-3">
                            <h4 className="text-[24px] text-black">Address:</h4>
                            <div className="relative ml-2">
                                <input
                                    type="text"
                                    className="py-2 px-3 w-full rounded-full border border-blue-300 focus:outline-none focus:ring focus:border-blue-600 text-black"
                                    placeholder="Address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                                <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                                    <HomeIcon className="h-5 w-5 text-gray-400" />
                                </div>
                            </div>
                        </div>
                        <div className="flex ml-4 mt-3">
                            <h4 className="text-[24px] text-black">Birthday:</h4>
                            <div className="relative ml-2">
                                <input
                                    type="date"
                                    className="py-2 px-3 w-full rounded-full border border-blue-300 focus:outline-none focus:ring focus:border-blue-600 text-black"
                                    placeholder="Birthday"
                                    value={birthday}
                                    onChange={(e) => setBirthday(e.target.value)}
                                />
                                <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                                    <CalendarIcon className="h-5 w-5 text-gray-400" />
                                </div>
                            </div>
                        </div>
                        <div className="flex ml-4 mt-2">
                            <h4 className="text-[24px] text-black">Avatar:</h4>
                            <div className="relative ml-2">
                                <div className="flex items-center">
                                    <img
                                        src={avatarUrl}
                                        alt="Avatar"
                                        className="h-10 w-10 rounded-full"
                                    />
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="ml-2"
                                        onChange={handleAvatarChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col ml-4 mt-2">
                            <h4 className="text-[24px] text-black">Description:</h4>
                            <textarea
                                className="py-2 px-3 w-full rounded border border-blue-300 focus:outline-none focus:ring focus:border-blue-600 text-black"
                                placeholder="Write a description..."
                                rows={4}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <div className="flex justify-center mt-4">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                onClick={handleSubmit}
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreateProfile