import React from 'react'
import MasterDataRoleEditContainer from '@/containers/MasterDataContainer/Role/MasterDataRoleEditContainer'
import WithAuth from '@/components/shared/WithAuth'

const MasterDataRoleEdit = () => {
  return <MasterDataRoleEditContainer />
}

export default WithAuth(MasterDataRoleEdit)
