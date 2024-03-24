import React from 'react'
import WithAuth from '@/components/shared/WithAuth'
import AnalisKebijakanContainer from '@/containers/PetaJabatanContainers/AsistenDeputi/AnalisKebijakanContainer'

const index = () => {
  return (
    <>
      <AnalisKebijakanContainer />
    </>
  )
}

export default WithAuth(index)

