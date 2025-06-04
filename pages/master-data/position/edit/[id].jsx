import React from 'react'
import MasterDataPositionEditContainer from '@/containers/MasterDataContainer/Position/MasterDataPositionEditContainer'
import WithAuth from '@/components/shared/WithAuth'

const MasterDataPositionEdit = () => {
  return <MasterDataPositionEditContainer />
}

export default WithAuth(MasterDataPositionEdit)
