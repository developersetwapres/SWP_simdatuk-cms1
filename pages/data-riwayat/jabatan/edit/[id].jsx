import React from 'react'
import RiwayatJabatanEditContainer from '@/containers/RiwayatContainer/JabatanContainer/RiwayatJabatanEditContainer'
import WithAuth from '@/components/shared/WithAuth'

const RiwayatJabatanEdit = () => {
  return <RiwayatJabatanEditContainer />
}

export default WithAuth(RiwayatJabatanEdit)
