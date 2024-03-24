import React from 'react'
import WithAuth from '@/components/shared/WithAuth'
import KepalaSubBagianContainer from '@/containers/PetaJabatanContainers/kepalaSubBagian/KepalaSubBagianContainer'

const index = () => {
  return (
    <>
      <KepalaSubBagianContainer />
    </>
  )
}

export default WithAuth(index)

