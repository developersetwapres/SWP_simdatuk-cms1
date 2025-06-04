import React from 'react'
import RiwayatHukumanDisiplinContainer from '@/containers/RiwayatContainer/HukumanDisiplinContainer/RiwayatHukumanDisiplinContainer'
import WithAuth from '@/components/shared/WithAuth'

const index = () => {
  return <RiwayatHukumanDisiplinContainer />
}

export default WithAuth(index)
