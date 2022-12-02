import React from 'react'
import { User } from '../types/global'

export interface UserContextType {
  user: User | undefined | null
  isSuccess: boolean
}

const UserContext = React.createContext<UserContextType>({
  user: null,
  isSuccess: false,
})

export default UserContext