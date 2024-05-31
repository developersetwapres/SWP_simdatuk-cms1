import React from 'react'
import RiwayatJabatanContainer from '@/containers/RiwayatContainer/JabatanContainer/RiwayatJabatanContainer'
import WithAuth from '@/components/shared/WithAuth'

const index = () => {
  return <RiwayatJabatanContainer />
}

export default WithAuth(index)
