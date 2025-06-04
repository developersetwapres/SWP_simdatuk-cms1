import React from 'react'
import MasterDataPositionDetailContainer from '@/containers/MasterDataContainer/Position/MasterDataPositionDetailContainer'
import WithAuth from '@/components/shared/WithAuth'

const MasterDataPositionDetail = () => {
  return <MasterDataPositionDetailContainer />
}

export default WithAuth(MasterDataPositionDetail)
