import React from 'react'
import RiwayatSKPContainer from '@/containers/RiwayatContainer/SKPContainer/RiwayatSKPContainer'
import WithAuth from '@/components/shared/WithAuth'

const index = () => {
  return <RiwayatSKPContainer />
}

export default WithAuth(index)
