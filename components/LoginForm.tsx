'use client'

import { accessToken, invalid, invalidEmailOrPassword, loginUrl } from '@/enum'
import { ILogin } from '@/interface'
import { openNotification } from '@/utils/notification'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Checkbox, Form, Input, notification } from 'antd'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React from 'react'


const LoginForm = () => {
    const router = useRouter();
    const [api, contextHolder] = notification.useNotification();

    const onLogin = (values: ILogin) => {
        const { email, password } = values;
        const userLogin = { email, password };
        axios.post(loginUrl, userLogin)
            .then((response) => {
                localStorage.setItem(accessToken, response.data.access_token)
                if (response.status === 201) {
                    router.push('/');
                }
            })
            .catch((error) => {
                console.log(error);
                if (error.response.status === 401) {
                    openNotification(api, invalid, invalidEmailOrPassword)
                }
            });
    }

    return (
        < div className='w-full py-48 px-14' >
            {contextHolder}
            <div>
                <h2 className='text-indigo-600 text-center font-bold text-3xl mb-5 '>USER LOGIN</h2>
            </div>
            <Form
                name="normal_login"
                className="login-form "
                initialValues={{ remember: true }}
                onFinish={onLogin}>
                <Form.Item
                    name="email"
                    rules={[{ required: true, message: 'Please input your Username!', }]}
                    className=''
                >
                    <Input
                        prefix={<UserOutlined className="site-form-item-icon " />}
                        className='rounded-full h-11 bg-indigo-200'
                        placeholder="Email"
                    />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your Password!' }]}
                >

                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                        className='rounded-full h-11 bg-indigo-200'
                        id='password'
                    />
                </Form.Item>
                <Form.Item className='justify-between flex'>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>
                    <a className="login-form-forgot ml-[150px]" href="">
                        Forgot password
                    </a>
                </Form.Item>
                <Form.Item>
                    <Button htmlType="submit" className="login-form-button w-full bg-indigo-600 text-white mb-2 rounded-full h-10">
                        Log in
                    </Button>
                    <div>
                        Or <a href="/register" className='text-indigo-600'>register now!</a>
                    </div>
                </Form.Item>
            </Form>
        </div >
    )
}

export default LoginForm