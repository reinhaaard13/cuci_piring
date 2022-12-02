import React, { useState } from 'react'
import { useQuery } from 'react-query';
import UserContext from '../contexts/UserContext'
import UserApi from '../services/UserApi';
import { User } from '../types/global';

type Props = {
  children: React.ReactNode;
}

const UserProvider = (props: Props) => {

  const { data, isSuccess } = useQuery(["User"], UserApi.getAuthenticatedUser);

  return (
    <UserContext.Provider value={{
      user: data,
      isSuccess
    }}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserProvider