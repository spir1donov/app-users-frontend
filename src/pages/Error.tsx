import React, { FC } from 'react'
import { Button, Result } from 'antd'
import type { ResultStatusType } from 'antd/lib/result'
import { NavLink } from 'react-router-dom'

interface IErrorBoxProps {
  message: string
  status?: ResultStatusType
  title?: string
}

const Error: FC<IErrorBoxProps> = ({ message, status = '404', title = 'Error' }) => {
  return (
    <Result
      title={title}
      subTitle={message}
      status={status}
      extra={
        <NavLink to='/'>
          <Button type='primary'>На главную</Button>
        </NavLink>
      }
    />
  )
}

export default Error
