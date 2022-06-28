import React, { FC } from 'react'

interface IErrorBoxProps {
  message: string
}

const Error: FC<IErrorBoxProps> = ({ message }) => {
  return <div>Error: {message}</div>
}

export default Error
