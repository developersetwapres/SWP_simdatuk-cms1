import React from 'react'
import PetaJabatanContainer from '@/containers/PetaJabatanContainers/PetaJabatanContainer'
import WithAuth from '@/components/shared/WithAuth'

const EmplyementPetaJabatan = () => {
  return <PetaJabatanContainer />
}

export default WithAuth(EmplyementPetaJabatan)
