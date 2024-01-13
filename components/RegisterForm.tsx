'use client'

import { emailExist, invalid, invalidRepeatPassword, pleaseLogin, registerSuccessfully, registerUrl, success } from '@/enum';
import { IRegister } from '@/interface';
import { openNotification } from '@/utils/notification';
import { sleep } from '@/utils/utils';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons'
import { Form, Button, Input, notification } from 'antd'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React from 'react'

const RegisterForm = () => {
    const [api, contextHolder] = notification.useNotification();
    const router = useRouter();

    const onRegister = (values: IRegister) => {
        const { email, name, password, repeatPassword } = values;
        const userRegister = { email, name, password }

        if (password !== repeatPassword) {
            openNotification(api, invalid, invalidRepeatPassword)
            return
        }
        axios.post(registerUrl, userRegister)
            .then(async (response) => {
                if (response.status === 201) {
                    openNotification(api, success, registerSuccessfully)
                    openNotification(api, success, pleaseLogin)
                    await sleep(2000)
                    router.push('/login');
                }
            })
            .catch((error) => {
                if (error.response.status === 403) {
                    openNotification(api, invalid, emailExist)
                }
            });
    }
    return (
        < div className='w-full py-48 px-14' >
            {contextHolder}
            <div>
                <h2 className='text-indigo-600 text-center font-bold text-3xl mb-5 '>USER REGISTER</h2>
            </div>
            <Form
                name="normal_register"
                className="login-form "
                onFinish={onRegister}>
                <Form.Item
                    name="email"
                    rules={[{ required: true, type: "email", message: 'Please input your Email!' }]}
                    className=''
                >
                    <Input
                        prefix={<MailOutlined className="site-form-item-icon " />}
                        className='rounded-full h-11 bg-indigo-200'
                        placeholder="Email"
                    />
                </Form.Item>
                <Form.Item
                    name="name"
                    rules={[{ required: true, message: 'Please input your Name!' },
                    { min: 5, message: 'Your name is too short' }]}
                    className=''
                >
                    <Input
                        prefix={<UserOutlined className="site-form-item-icon " />}
                        className='rounded-full h-11 bg-indigo-200'
                        placeholder="Name"
                    />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your Password!' },
                    { min: 6, message: 'Your password is too short' }]}
                >

                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                        className='rounded-full h-11 bg-indigo-200'
                        id='password'
                    />
                </Form.Item>
                <Form.Item
                    name="repeatPassword"
                    rules={[{ required: true, message: 'Please input your Repeat Password!' }]}
                >

                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Repeat Password"
                        className='rounded-full h-11 bg-indigo-200'
                        id='repeatPassword'
                    />
                </Form.Item>
                <Form.Item>
                    <Button htmlType="submit" className="login-form-button w-full bg-indigo-600 text-white mb-2 rounded-full h-10">
                        Register
                    </Button>
                    <div className='pl-4'>
                        If you have account <a href="/login" className='text-indigo-600 font-bold'>login here!</a>
                    </div>
                </Form.Item>
            </Form>
        </div >
    )
}

export default RegisterForm