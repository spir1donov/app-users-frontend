import React, { FC, Key, ReactNode } from 'react'
import { Menu, MenuProps } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'
import { ContactsOutlined, HomeOutlined, UserOutlined } from '@ant-design/icons'

type MenuItem = Required<MenuProps>['items'][number]

function getItem(label: ReactNode, key: Key, icon?: ReactNode): MenuItem {
  return {
    key,
    label,
    icon,
  } as MenuItem
}

const items: MenuProps['items'] = [
  getItem('Главная страница', '/', <HomeOutlined />),
  getItem('Профиль', '/account', <UserOutlined />),
  getItem('Аккаунты', '/people', <ContactsOutlined />),
]

const Navigation: FC = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const onClick: MenuProps['onClick'] = e => {
    const { key } = e
    navigate(key)
  }

  return <Menu onClick={onClick} defaultSelectedKeys={[pathname]} mode='inline' items={items} />
}

export default Navigation
