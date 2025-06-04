import React from 'react'
import MasterDataRoleContainer from '@/containers/MasterDataContainer/Role/MasterDataRoleContainer'
import WithAuth from '@/components/shared/WithAuth'

const index = () => {
  return <MasterDataRoleContainer />
}

export default WithAuth(index)
