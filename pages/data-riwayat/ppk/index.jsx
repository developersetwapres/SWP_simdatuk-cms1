import React from 'react'
import RiwayatPPKContainer from '@/containers/RiwayatContainer/PPKContainer/RiwayatPPKContainer'
import WithAuth from '@/components/shared/WithAuth'

const index = () => {
  return <RiwayatPPKContainer />
}

export default WithAuth(index)
