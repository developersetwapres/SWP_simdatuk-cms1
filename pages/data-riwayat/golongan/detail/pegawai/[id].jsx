import React from 'react'
import RiwayatGolonganDetailPegawaiContainer from '@/containers/RiwayatContainer/GolonganContainer/RiwayatGolonganDetailPegawaiContainer'
import WithAuth from '@/components/shared/WithAuth'

const DetailPegawaiGolongan = () => {
  return <RiwayatGolonganDetailPegawaiContainer />
}

export default WithAuth(DetailPegawaiGolongan)
