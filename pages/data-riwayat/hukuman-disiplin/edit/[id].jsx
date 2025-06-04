import React from 'react'
import RiwayatHukumanDisiplinEditContainer from '@/containers/RiwayatContainer/HukumanDisiplinContainer/RiwayatHukumanDisiplinEditContainer'
import WithAuth from '@/components/shared/WithAuth'

const RiwayatHukumanDisiplinEdit = () => {
  return <RiwayatHukumanDisiplinEditContainer />
}

export default WithAuth(RiwayatHukumanDisiplinEdit)
