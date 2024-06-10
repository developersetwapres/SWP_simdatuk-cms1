import React from 'react'
import MasterDataEmployementTypeContainer from '@/containers/MasterDataContainer/EmployementType/MasterDataEmployementTypeContainer'
import WithAuth from '@/components/shared/WithAuth'

const index = () => {
  return <MasterDataEmployementTypeContainer />
}

export default WithAuth(index)
