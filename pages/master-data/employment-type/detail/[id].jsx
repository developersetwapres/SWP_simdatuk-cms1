import React from 'react'
import MasterDataEmployementTypeDetailContainer from '@/containers/MasterDataContainer/EmployementType/MasterDataEmployementTypeDetailContainer'
import WithAuth from '@/components/shared/WithAuth'

const MasterDataEmployementTypeDetail = () => {
  return <MasterDataEmployementTypeDetailContainer />
}

export default WithAuth(MasterDataEmployementTypeDetail)
