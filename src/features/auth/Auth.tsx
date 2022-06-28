import React, { FC } from 'react'
import { Tabs } from 'antd'
import SignUpForm from '../signup/SignUp'
import SignInForm from '../signin/SignIn'

const { TabPane } = Tabs

const Auth: FC = () => {
  return (
    <div>
      <Tabs>
        <TabPane tab='Регистрация' key='1'>
          <SignUpForm />
        </TabPane>
        <TabPane tab='Вход' key='2'>
          <SignInForm />
        </TabPane>
      </Tabs>
    </div>
  )
}

export default Auth
