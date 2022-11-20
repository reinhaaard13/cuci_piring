import React from "react"

export type ColorScheme = "light" | "dark"
export interface ColorSchemeContextType {
  colorScheme: ColorScheme
  setColorScheme: React.Dispatch<React.SetStateAction<ColorScheme>>
}