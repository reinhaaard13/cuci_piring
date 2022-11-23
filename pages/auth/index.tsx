import React, { useState } from 'react'
import LoginForm from '../../components/organism/LoginForm'
import RegisterForm from '../../components/organism/RegisterForm'

type Props = {}

const AuthPage = (props: Props) => {
  const [isLoginMode, setIsLoginMode] = useState(true)

  const toggleMode = () => setIsLoginMode(prevState => !prevState)

  if (isLoginMode) {
    return (
      <LoginForm toggleMode={toggleMode} />
    )
  } else {
    return (
      <RegisterForm toggleMode={toggleMode} />
    )
  }
}

export default AuthPage