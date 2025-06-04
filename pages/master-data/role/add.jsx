import React from 'react'
import MasterDataRoleAddContainer from '@/containers/MasterDataContainer/Role/MasterDataRoleAddContainer'
import WithAuth from '@/components/shared/WithAuth'

const MasterDataRoleAdd = () => {
  return <MasterDataRoleAddContainer />
}

export default WithAuth(MasterDataRoleAdd)
