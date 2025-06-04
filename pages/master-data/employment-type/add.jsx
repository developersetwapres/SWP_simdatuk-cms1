import React from 'react'
import MasterDataEmployementTypeAddContainer from '@/containers/MasterDataContainer/EmployementType/MasterDataEmployementTypeAddContainer'
import WithAuth from '@/components/shared/WithAuth'

const MasterDataEmployementTypeAdd = () => {
  return <MasterDataEmployementTypeAddContainer />
}

export default WithAuth(MasterDataEmployementTypeAdd)
