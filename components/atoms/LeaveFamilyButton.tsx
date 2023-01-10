import React from 'react'

import {
  UnstyledButton
} from "@mantine/core"

type Props = {}

const LeaveFamilyButton = (props: Props) => {
  return (
    <UnstyledButton sx={theme => ({
      display: "flex",
      color: "red",
      alignItems: "center",
      marginTop: theme.spacing.sm,
      padding: theme.spacing.md,
      fontWeight: 600,
      borderRadius: theme.radius.md,
      width: "100%",

      "&:hover": {
        backgroundColor: "rgba(255, 0, 0, 0.1)"
      }
    })}>
      Leave Family
    </UnstyledButton>
  )
}

export default LeaveFamilyButton