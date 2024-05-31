import React from 'react'
import RiwayatGolonganContainer from '@/containers/RiwayatContainer/GolonganContainer/RiwayatGolonganContainer'
import WithAuth from '@/components/shared/WithAuth'

const index = () => {
  return <RiwayatGolonganContainer />
}

export default WithAuth(index)
