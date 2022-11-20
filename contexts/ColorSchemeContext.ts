import React, { createContext } from "react"
import { ColorScheme, ColorSchemeContextType } from "../types/context"

export const ColorSchemeContext = createContext<ColorSchemeContextType>({
  colorScheme: "light",
  setColorScheme: () => {}
})