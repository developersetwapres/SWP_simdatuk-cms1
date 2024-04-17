import React from 'react'
import WithAuth from '@/components/shared/WithAuth'
import StaffWakilPresidenContainer from '@/containers/PetaJabatanContainers/StaffWakilPresiden/StaffWakilPresidenContainer'

const index = () => {
  return <StaffWakilPresidenContainer />
}

export default WithAuth(index)
