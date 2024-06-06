import React from 'react'
import MasterDataPositionContainer from '@/containers/MasterDataContainer/Position/MasterDataPositionContainer'
import WithAuth from '@/components/shared/WithAuth'

const index = () => {
  return <MasterDataPositionContainer />
}

export default WithAuth(index)
