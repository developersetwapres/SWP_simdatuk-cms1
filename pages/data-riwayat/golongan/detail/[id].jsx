import WithAuth from '@/components/shared/WithAuth'
import RiwayatGolonganDetailContainer from '@/containers/RiwayatContainer/GolonganContainer/RiwayatGolonganDetailContainer'
import React from 'react'

const DetailRiwayatGolongan = () => {
  return <RiwayatGolonganDetailContainer />
}

export default WithAuth(DetailRiwayatGolongan)
