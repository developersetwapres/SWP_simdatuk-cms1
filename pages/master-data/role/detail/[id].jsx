import React from 'react'
import MasterDataRoleDetailContainer from '@/containers/MasterDataContainer/Role/MasterDataRoleDetailContainer'
import WithAuth from '@/components/shared/WithAuth'

const MasterDataRoleDetail = () => {
  return <MasterDataRoleDetailContainer />
}

export default WithAuth(MasterDataRoleDetail)
