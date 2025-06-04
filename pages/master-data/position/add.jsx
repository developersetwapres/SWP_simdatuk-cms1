import React from 'react'
import MasterDataPositionAddContainer from '@/containers/MasterDataContainer/Position/MasterDataPositionAddContainer'
import WithAuth from '@/components/shared/WithAuth'

const MasterDataPositionAdd = () => {
  return <MasterDataPositionAddContainer />
}

export default WithAuth(MasterDataPositionAdd)
