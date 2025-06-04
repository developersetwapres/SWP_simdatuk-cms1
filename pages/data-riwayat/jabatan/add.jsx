import React from 'react'
import RiwayatJabatanAddContainer from '@/containers/RiwayatContainer/JabatanContainer/RiwayatJabatanAddContainer'
import WithAuth from '@/components/shared/WithAuth'

const RiwayatJabatanAdd = () => {
  return <RiwayatJabatanAddContainer />
}

export default WithAuth(RiwayatJabatanAdd)
