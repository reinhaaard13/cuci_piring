import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import React, {useEffect} from 'react'
import axios from '../../services/axios';
import Token from '../../services/Token';
import PropTypes from "prop-types"
import { showNotification } from '@mantine/notifications';

type Props = {
  children: React.ReactNode;
}

const WithAxios = (props: Props) => {
  const router = useRouter()

  useEffect(() => {
    const token = Token.getToken()
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
    axios.interceptors.response.use(
      res => res,
      (err: AxiosError) => {
        if (err.response?.status === 401) {
          Token.removeToken()
          axios.defaults.headers.common["Authorization"] = ""
          showNotification({
            title: "Sesi anda telah berakhir",
            message: "Silakan login kembali untuk melanjutkan",
            color: "red",
          });
          router.replace("/auth")
        }
        return Promise.reject(err)
      }
    )
    }, [])
  
  return (
    <>{props.children}</>
  )
}

WithAxios.propTypes = {
  children: PropTypes.node.isRequired,
}

export default WithAxios