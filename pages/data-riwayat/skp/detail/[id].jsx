import React from 'react'
import RiwayatSKPDetailContainer from '@/containers/RiwayatContainer/SKPContainer/RiwayatSKPDetailContainer'
import WithAuth from '@/components/shared/WithAuth'

const DetailRiwayatSKP = () => {
  return <RiwayatSKPDetailContainer />
}

export default WithAuth(DetailRiwayatSKP)
