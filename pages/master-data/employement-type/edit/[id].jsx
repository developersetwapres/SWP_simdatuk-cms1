import React from 'react'
import MasterDataEmployementTypeEditContainer from '@/containers/MasterDataContainer/EmployementType/MasterDataEmployementTypeEditContainer'
import WithAuth from '@/components/shared/WithAuth'

const MasterDataEmployementTypeEdit = () => {
  return <MasterDataEmployementTypeEditContainer />
}

export default WithAuth(MasterDataEmployementTypeEdit)
