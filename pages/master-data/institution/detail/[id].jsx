import React from 'react'
import MasterDataInstitutionDetailContainer from '@/containers/MasterDataContainer/Institution/MasterDataInstitutionDetailContainer'
import WithAuth from '@/components/shared/WithAuth'

const MasterDataInstitutionDetail = () => {
  return <MasterDataInstitutionDetailContainer />
}

export default WithAuth(MasterDataInstitutionDetail)
