import React from 'react'
import RiwayatJabatanDetailPegawaiContainer from '@/containers/RiwayatContainer/JabatanContainer/RiwayatJabatanDetailPegawaiContainer'
import WithAuth from '@/components/shared/WithAuth'

const DetailPegawaiJabatan = () => {
  return <RiwayatJabatanDetailPegawaiContainer />
}

export default WithAuth(DetailPegawaiJabatan)
