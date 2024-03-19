import React from 'react'
import WithAuth from '@/components/shared/WithAuth'
import PetaJabatanDeputiContaiiner from '@/containers/petaJabatanContainer/deputi/PetaJabatanDeputiContainer'

const index = () => {
  return (
    <>
      <PetaJabatanDeputiContaiiner />
    </>
  )
}

export default WithAuth(index)

