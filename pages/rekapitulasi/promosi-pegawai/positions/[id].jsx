import React from 'react'
import WithAuth from '@/components/shared/WithAuth'
import PositionsContainer from '@/containers/PromosiPegawaiContainer/PositionsContainer'

const index = () => {
  return <PositionsContainer />
}

export default WithAuth(index)
