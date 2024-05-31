import React from 'react'
import MasterDataUserAddContainer from '@/containers/MasterDataContainer/User/MasterDataUserAddContainer'
import WithAuth from '@/components/shared/WithAuth'

const MasterDataUserAdd = () => {
  return <MasterDataUserAddContainer />
}

export default WithAuth(MasterDataUserAdd)
