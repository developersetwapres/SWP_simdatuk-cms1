import React from 'react'
import WithAuth from '@/components/shared/WithAuth'
import PetaJabatanContainer from '@/containers/PetaJabatanContainers/PetaJabatanContainer'

const index = () => {
  return <PetaJabatanContainer />
}

export default WithAuth(index)
