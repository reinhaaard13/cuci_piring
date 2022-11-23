import React from 'react'

import { Box, Text } from "@mantine/core"
import Image from 'next/image'

import HeroImage from "../../public/food.png"

type Props = {}

const Hero = (props: Props) => {
  return (
    <Box sx={(theme) => ({
      padding: theme.spacing.md,
      maxWidth: theme.breakpoints.lg,
      background: theme.fn.linearGradient(225, "rgb(61,245,167)", "rgb(9,111,224)"),
      borderRadius: theme.radius.md,
      position: "relative",
      marginTop: 80,
      display: "flex",
      height: 100,
    })}>
      <Text sx={theme => ({
        fontSize: theme.fontSizes.xl,
        color: "white",
        lineHeight: 1.15,
        alignSelf: "end",
        justifySelf: "end",
        maxWidth: "70%",
        zIndex: 1,
      })}>
        Cuci piring adalah bagian dari iman
      </Text>
      <Image src={HeroImage} alt="Hero Image" height={125} style={{
        position: "absolute",
        right: 0,
        bottom: 40,
      }} />
    </Box>
  )
}

export default Hero