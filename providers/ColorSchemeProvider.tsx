import React, { useState, useEffect } from 'react'
import PropTypes from "prop-types"

import { ColorSchemeContext } from '../contexts/ColorSchemeContext'
import { ColorScheme } from '../types/context'

type Props = {
  children: React.ReactNode;
}

const ColorSchemeProvider: React.FC<Props> = ({ children }) => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("light")

  useEffect(() => {
    const savedColorScheme = localStorage.getItem("colorScheme") as ColorScheme | null
    if (savedColorScheme) {
      setColorScheme(savedColorScheme)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("colorScheme", colorScheme)
  }, [colorScheme])

  return (
    <ColorSchemeContext.Provider value={{colorScheme, setColorScheme}}>
      {children}
    </ColorSchemeContext.Provider>
  )
}

ColorSchemeProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export default ColorSchemeProvider