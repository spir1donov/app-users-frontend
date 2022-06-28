import React from 'react'
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
  return (
    <BrowserRouter>
      <Layout>
        <Sider breakpoint='lg' collapsedWidth='0'>
          <Navigation />
        </Sider>
        <Content className='layout-background layout-content layout-wrapper'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/account' element={<Profile />} />
            <Route path='/people' element={<Users />} />
            <Route path='*' element={<Error message='Страница не найдена' />} />
          </Routes>
        </Content>
      </Layout>
    </BrowserRouter>
  )
}

export default App
