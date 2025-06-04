import React from 'react'
import RiwayatSKPDetailPegawaiContainer from '@/containers/RiwayatContainer/SKPContainer/RiwayatSKPDetailPegawaiContainer'
import WithAuth from '@/components/shared/WithAuth'

const DetailPegawaiSKP = () => {
  return <RiwayatSKPDetailPegawaiContainer />
}

export default WithAuth(DetailPegawaiSKP)
