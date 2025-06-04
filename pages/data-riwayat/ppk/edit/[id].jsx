import React from 'react'
import RiwayatPPKEditContainer from '@/containers/RiwayatContainer/PPKContainer/RiwayatPPKEditContainer'
import WithAuth from '@/components/shared/WithAuth'

const RiwayatPPKEdit = () => {
  return <RiwayatPPKEditContainer />
}

export default WithAuth(RiwayatPPKEdit)
