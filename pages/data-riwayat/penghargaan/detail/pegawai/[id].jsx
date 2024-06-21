import React from 'react'
import RiwayatPenghargaanContainer from '@/containers/RiwayatContainer/PenghargaanContainer/RiwayatPenghargaanContainer'
import WithAuth from '@/components/shared/WithAuth'

const DetailPegawaiPenghargaan = () => {
  return <RiwayatPenghargaanContainer />
}

export default WithAuth(DetailPegawaiPenghargaan)
