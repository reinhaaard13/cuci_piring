import React from 'react'

import {
  Box,
  Text
} from "@mantine/core";
import FeedItem from '../molecules/FeedItem';

type Props = {}

const FeedSection = (props: Props) => {
  return (
    <Box sx={(theme) => ({
      margin: theme.spacing.md,
      maxWidth: theme.breakpoints.lg,
      
      [theme.fn.largerThan("lg")]: {
        margin: `${theme.spacing.md}px auto`,
      }
    })}>
      <Text sx={
        theme => ({
          fontSize: theme.fontSizes.xs,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          fontWeight: 600,
          color: theme.colorScheme === "light" ? theme.colors.gray[7] : theme.colors.gray[3],
        })
      }>Cuci Piring Terbaru</Text>

      <FeedItem />
      <FeedItem />
      <FeedItem />
    </Box>
  )
}

export default FeedSection