import React from 'react'
import RiwayatSKPAddContainer from '@/containers/RiwayatContainer/SKPContainer/RiwayatSKPAddContainer'
import WithAuth from '@/components/shared/WithAuth'

const RiwayatSKPAdd = () => {
  return <RiwayatSKPAddContainer />
}

export default WithAuth(RiwayatSKPAdd)
