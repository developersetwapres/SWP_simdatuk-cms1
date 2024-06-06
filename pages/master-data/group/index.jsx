import React from 'react'
import MasterDataGroupContainer from '@/containers/MasterDataContainer/Group/MasterDataGroupContainer'
import WithAuth from '@/components/shared/WithAuth'

const index = () => {
  return <MasterDataGroupContainer />
}

export default WithAuth(index)
