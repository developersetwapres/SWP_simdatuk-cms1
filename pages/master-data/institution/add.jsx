import React from 'react'
import MasterDataInstitutionAddContainer from '@/containers/MasterDataContainer/Institution/MasterDataInstitutionAddContainer'
import WithAuth from '@/components/shared/WithAuth'

const MasterDataInstitutionAdd = () => {
  return <MasterDataInstitutionAddContainer />
}

export default WithAuth(MasterDataInstitutionAdd)
