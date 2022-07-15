import React, { FC, useState } from 'react'
import { Button, DatePicker, Form, Input, message, Select, Upload } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import type { UploadChangeParam } from 'antd/es/upload'
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface'
import type { UploadRequestOption as RcCustomRequestOptions } from 'rc-upload/lib/interface'
import validateMessages from '../../helpers/validateMessages'
import layout from '../../helpers/formLayout'

const { Option } = Select

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

  const uploadImage = async (options: RcCustomRequestOptions) => {
    const { onSuccess, onError, file } = options
    console.log(options)
    console.log(file)

    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      onSuccess('Ok')
      console.log('success')
    } catch (err) {
      console.log('Eroor: ', err)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      onError({ err })
    }
  }

  const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    console.log('handleChange', info)
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
      beforeUpload={beforeUpload}
      onChange={handleChange}
      customRequest={uploadImage}
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
      <Form.Item label='Пароль' style={{ marginBottom: 0 }}>
        <Form.Item
          name='password1'
          rules={[{ required: true }]}
          style={{ display: 'inline-block', width: 'calc(50% - 8px / 2)' }}
        >
          <Input type='password' />
        </Form.Item>
        <Form.Item
          name='password2'
          rules={[{ required: true }]}
          style={{ display: 'inline-block', width: 'calc(50% - 8px / 2)', margin: '0 0 0 8px' }}
        >
          <Input type='password' />
        </Form.Item>
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
          Регистрация
        </Button>
      </Form.Item>
    </Form>
  )
}

export default SignUpForm
