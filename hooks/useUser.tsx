import React, { useEffect } from 'react'

type Props = {}

const useUser = (props: Props) => {
  const [user, setUser] = React.useState(null)
  const [authenticated, setAuthenticated] = React.useState(false)

  useEffect(() => {
    
  }, [])
}

export default useUser