import React from 'react'
import NewFeedButton from '../../components/atoms/NewFeedButton'
import FeedSection from '../../components/organism/FeedSection'

import HeroKeluarga from '../../components/organism/HeroKeluarga'

type Props = {}

const KeluargaPage = (props: Props) => {
  return (
    <>
      <HeroKeluarga />

      <FeedSection />
      <NewFeedButton />
    </>
  )
}

export default KeluargaPage