import React from 'react'
import RiwayatPenghargaanDetailPegawaiContainer from '@/containers/RiwayatContainer/PenghargaanContainer/RiwayatPenghargaanDetailPegawaiContainer'
import WithAuth from '@/components/shared/WithAuth'

const DetailPegawaiPenghargaan = () => {
  return <RiwayatPenghargaanDetailPegawaiContainer />
}

export default WithAuth(DetailPegawaiPenghargaan)
