import React from 'react'
import RiwayatSKPEditContainer from '@/containers/RiwayatContainer/SKPContainer/RiwayatSKPEditContainer'
import WithAuth from '@/components/shared/WithAuth'

const RiwayatSKPEdit = () => {
  return <RiwayatSKPEditContainer />
}

export default WithAuth(RiwayatSKPEdit)
