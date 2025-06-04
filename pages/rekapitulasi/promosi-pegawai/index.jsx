import React from 'react'
import WithAuth from '@/components/shared/WithAuth'
import PromosiPegawaiContainer from '@/containers/PromosiPegawaiContainer/PromosiPegawaiContainer'

const index = () => {
  return <PromosiPegawaiContainer />
}

export default WithAuth(index)
