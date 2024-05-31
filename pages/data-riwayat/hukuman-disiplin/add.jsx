import React from 'react'
import RiwayatHukumanDisiplinAddContainer from '@/containers/RiwayatContainer/HukumanDisiplinContainer/RiwayatHukumanDisiplinAddContainer'
import WithAuth from '@/components/shared/WithAuth'

const RiwayatHukumanDisiplinAdd = () => {
  return <RiwayatHukumanDisiplinAddContainer />
}

export default WithAuth(RiwayatHukumanDisiplinAdd)
