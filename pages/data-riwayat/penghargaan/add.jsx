import React from 'react'
import RiwayatPenghargaanAddContainer from '@/containers/RiwayatContainer/PenghargaanContainer/RiwayatPenghargaanAddContainer'
import WithAuth from '@/components/shared/WithAuth'

const RiwayatPenghargaanAdd = () => {
  return <RiwayatPenghargaanAddContainer />
}

export default WithAuth(RiwayatPenghargaanAdd)
