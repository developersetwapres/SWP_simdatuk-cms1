import React from 'react'
import RiwayatPPKAddContainer from '@/containers/RiwayatContainer/PPKContainer/RiwayatPPKAddContainer'
import WithAuth from '@/components/shared/WithAuth'

const RiwayatPPKAdd = () => {
  return <RiwayatPPKAddContainer />
}

export default WithAuth(RiwayatPPKAdd)
