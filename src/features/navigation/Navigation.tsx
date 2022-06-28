import React, { FC, Key, ReactNode } from 'react'
import { Menu, MenuProps } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'

type MenuItem = Required<MenuProps>['items'][number]

function getItem(label: ReactNode, key: Key): MenuItem {
  return {
    key,
    label,
  } as MenuItem
}

const items: MenuProps['items'] = [
  getItem('Главная страница', '/'),
  getItem('Профиль', '/account'),
  getItem('Аккаунты', '/people'),
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
