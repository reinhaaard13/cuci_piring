import React, { useContext } from 'react'

import { ColorSchemeContext } from '../contexts/ColorSchemeContext'
import { ColorScheme } from '../types/context'

const useColorScheme = () => {
  const { colorScheme, setColorScheme } = useContext(ColorSchemeContext)
  const toggleColorScheme = () => {
    setColorScheme((prevColorScheme: ColorScheme) => prevColorScheme === "light" ? "dark" : "light")
  }

  return { colorScheme, setColorScheme, toggleColorScheme }
}

export default useColorScheme