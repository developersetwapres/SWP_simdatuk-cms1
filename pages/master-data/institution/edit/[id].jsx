import React from 'react'
import MasterDataInstitutionEditContainer from '@/containers/MasterDataContainer/Institution/MasterDataInstitutionEditContainer'
import WithAuth from '@/components/shared/WithAuth'

const MasterDataInstitutionEdit = () => {
  return <MasterDataInstitutionEditContainer />
}

export default WithAuth(MasterDataInstitutionEdit)
