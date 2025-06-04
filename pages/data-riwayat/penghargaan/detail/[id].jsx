import React from 'react'
import RiwayatPenghargaanDetailContainer from '@/containers/RiwayatContainer/PenghargaanContainer/RiwayatPenghargaanDetailContainer'
import WithAuth from '@/components/shared/WithAuth'

const DetailRiwayatPenghargaan = () => {
  return <RiwayatPenghargaanDetailContainer />
}

export default WithAuth(DetailRiwayatPenghargaan)
