import React, { useState } from 'react'
import { Layout } from 'antd'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navigation from './features/navigation/Navigation'
import './App.css'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Users from './pages/Users'
import Error from './pages/Error'

const { Content, Sider } = Layout

function App() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <BrowserRouter>
      <Layout>
        <Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
          <Navigation />
        </Sider>
        <Content className='layout-background layout-content layout-wrapper'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/account' element={<Profile />} />
            <Route path='/people' element={<Users />} />
            <Route path='*' element={<Error message='not found' />} />
          </Routes>
        </Content>
      </Layout>
    </BrowserRouter>
  )
}

export default App
