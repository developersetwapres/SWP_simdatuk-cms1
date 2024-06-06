import React from 'react'
import MasterDataInstitutionContainer from '@/containers/MasterDataContainer/Institution/MasterDataInstitutionContainer'
import WithAuth from '@/components/shared/WithAuth'

const index = () => {
  return <MasterDataInstitutionContainer />
}

export default WithAuth(index)
