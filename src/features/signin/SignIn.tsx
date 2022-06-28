import React, { FC, useState } from 'react'
import { Button, DatePicker, Form, Input, message, Select, Tabs, Upload } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import type { UploadChangeParam } from 'antd/es/upload'
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface'

const { TabPane } = Tabs
const { Option } = Select

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
}

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: 'Поле ${label} обязательно для заполнения!',
  types: {
    email: '${label} - некорректный email!',
  },
}
/* eslint-enable no-template-curly-in-string */

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result as string))
  reader.readAsDataURL(img)
}

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!')
  }
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!')
  }
  return isJpgOrPng && isLt2M
}

const AvatarUpload: FC = () => {
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState<string>()

  const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === 'uploading') {
      setLoading(true)
      return
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, url => {
        setLoading(false)
        setImageUrl(url)
      })
    }
  }

  const uploadButton = <div>{loading ? <LoadingOutlined /> : <PlusOutlined />}</div>

  return (
    <Upload
      name='avatar'
      listType='picture-card'
      className='avatar-uploader'
      showUploadList={false}
      action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
      beforeUpload={beforeUpload}
      onChange={handleChange}
    >
      {imageUrl ? <img src={imageUrl} alt='avatar' style={{ width: '100%' }} /> : uploadButton}
    </Upload>
  )
}

const SignUpForm: FC = () => {
  return (
    <Form onFinish={console.log} validateMessages={validateMessages} {...layout}>
      <Form.Item name='name' label='Имя' rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name='email' label='Email' rules={[{ required: true }]}>
        <Input type='email' />
      </Form.Item>
      <Form.Item name='password' label='Пароль' rules={[{ required: true }]}>
        <Input type='password' />
      </Form.Item>
      <Form.Item name='dob' label='Дата рождения' rules={[{ required: true }]}>
        <DatePicker placeholder='' />
      </Form.Item>
      <Form.Item name='sex' label='Пол' rules={[{ required: true }]}>
        <Select allowClear>
          <Option value='male'>мужской</Option>
          <Option value='female'>женский</Option>
          <Option value='other'>другое</Option>
        </Select>
      </Form.Item>
      <Form.Item name='avatar' label='Фото профиля'>
        <AvatarUpload />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type='primary' htmlType='submit'>
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

const SignIn: FC = () => {
  return (
    <div>
      <Tabs>
        <TabPane tab='Регистрация' key='1'>
          <SignUpForm />
        </TabPane>
        <TabPane tab='Вход' key='2'>
          S
        </TabPane>
      </Tabs>
    </div>
  )
}

export default SignIn
