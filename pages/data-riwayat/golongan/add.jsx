import React from 'react'
import RiwayatGolonganAddContainer from '@/containers/RiwayatContainer/GolonganContainer/RiwayatGolonganAddContainer'
import WithAuth from '@/components/shared/WithAuth'

const RiwayatGolonganAdd = () => {
  return <RiwayatGolonganAddContainer />
}

export default WithAuth(RiwayatGolonganAdd)
