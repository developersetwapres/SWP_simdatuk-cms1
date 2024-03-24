import React from 'react'
import WithAuth from '@/components/shared/WithAuth'
import PetaJabatanDeputiContaiiner from '@/containers/PetaJabatanContainers/Deputi/PetaJabatanDeputiContainer'

const index = () => {
  return (
    <>
      <PetaJabatanDeputiContaiiner />
    </>
  )
}

export default WithAuth(index)

