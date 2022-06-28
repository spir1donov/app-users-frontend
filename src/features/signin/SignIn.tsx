import React, { FC } from 'react'
import { Button, Form, Input } from 'antd'
import validateMessages from '../../helpers/validateMessages'
import layout from '../../helpers/formLayout'

const SignInForm: FC = () => {
  return (
    <Form onFinish={console.log} validateMessages={validateMessages} {...layout}>
      <Form.Item name='email' label='Email' rules={[{ required: true }]}>
        <Input type='email' />
      </Form.Item>
      <Form.Item name='password' label='Пароль' rules={[{ required: true }]}>
        <Input type='password' />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type='primary' htmlType='submit'>
          Вход
        </Button>
      </Form.Item>
    </Form>
  )
}

export default SignInForm
