import React from 'react'
import MasterDataUserEditContainer from '@/containers/MasterDataContainer/User/MasterDataUserEditContainer'
import WithAuth from '@/components/shared/WithAuth'

const MasterDataUserEdit = () => {
  return <MasterDataUserEditContainer />
}

export default WithAuth(MasterDataUserEdit)
