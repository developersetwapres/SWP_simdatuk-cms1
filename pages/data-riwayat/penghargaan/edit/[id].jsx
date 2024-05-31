import React from 'react'
import RiwayatPenghargaanEditContainer from '@/containers/RiwayatContainer/PenghargaanContainer/RiwayatPenghargaanEditContainer'
import WithAuth from '@/components/shared/WithAuth'

const RiwayatPenghargaanEdit = () => {
  return <RiwayatPenghargaanEditContainer />
}

export default WithAuth(RiwayatPenghargaanEdit)
