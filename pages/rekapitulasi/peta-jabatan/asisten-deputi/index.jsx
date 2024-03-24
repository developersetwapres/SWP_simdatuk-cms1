import React from 'react'
import WithAuth from '@/components/shared/WithAuth'
import AsistenDeputiContainer from '@/containers/PetaJabatanContainers/AsistenDeputi/AsistenDeputiContainer'

const index = () => {
  return (
    <>
      <AsistenDeputiContainer />
    </>
  )
}

export default WithAuth(index)

