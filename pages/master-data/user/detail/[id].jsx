import React from 'react'
import MasterDataUserDetailContainer from '@/containers/MasterDataContainer/User/MasterDataUserDetailContainer'
import WithAuth from '@/components/shared/WithAuth'

const MasterDataUserDetail = () => {
  return <MasterDataUserDetailContainer />
}

export default WithAuth(MasterDataUserDetail)
