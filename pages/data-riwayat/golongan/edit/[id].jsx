import React from 'react'
import RiwayatGolonganEditContainer from '@/containers/RiwayatContainer/GolonganContainer/RiwayatGolonganEditContainer'
import WithAuth from '@/components/shared/WithAuth'

const RiwayatGolonganEdit = () => {
  return <RiwayatGolonganEditContainer />
}

export default WithAuth(RiwayatGolonganEdit)
