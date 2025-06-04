import React from 'react'
import WithAuth from '@/components/shared/WithAuth'
import ComparisonsContainer from '@/containers/PromosiPegawaiContainer/ComparisonsContainer'

const index = () => {
  return <ComparisonsContainer />
}

export default WithAuth(index)
