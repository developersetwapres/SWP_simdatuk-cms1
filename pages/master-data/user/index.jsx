import React from 'react'
import MasterDataUserContainer from '@/containers/MasterDataContainer/User/MasterDataUserContainer'
import WithAuth from '@/components/shared/WithAuth'

const index = () => {
  return <MasterDataUserContainer />
}

export default WithAuth(index)
