import React from 'react'
import useColorScheme from '../../hooks/useColorScheme'

import styles from '../../styles/Loader.module.css'

type Props = {}

const Loader = (props: Props) => {
  const {colorScheme} = useColorScheme()

  return (
    <div className={styles.loader}>
      <span className={`${styles.dot} ${styles.a} ${styles[colorScheme]}`}></span>
      <span className={`${styles.dot} ${styles.b} ${styles[colorScheme]}`}></span>
      <span className={`${styles.dot} ${styles.c} ${styles[colorScheme]}`}></span>
    </div>
  )
}

export default Loader