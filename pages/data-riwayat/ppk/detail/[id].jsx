import React from 'react'
import RiwayatPPKDetailContainer from '@/containers/RiwayatContainer/PPKContainer/RiwayatPPKDetailContainer'
import WithAuth from '@/components/shared/WithAuth'

const DetailRiwayatPPK = () => {
  return <RiwayatPPKDetailContainer />
}

export default WithAuth(DetailRiwayatPPK)
