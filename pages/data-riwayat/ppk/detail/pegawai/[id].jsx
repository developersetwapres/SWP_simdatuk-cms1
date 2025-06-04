import React from 'react'
import RiwayatPPKDetailPegawaiContainer from '@/containers/RiwayatContainer/PPKContainer/RiwayatPPKDetailPegawaiContainer'
import WithAuth from '@/components/shared/WithAuth'

const DetailPegawaiPPK = () => {
  return <RiwayatPPKDetailPegawaiContainer />
}

export default WithAuth(DetailPegawaiPPK)
