import React from 'react'
import WithAuth from '@/components/shared/WithAuth'
import PegawaiAsnContainer from '@/containers/PegawaiAsnContainers/PegawaiAsnContainer'

const index = () => {
  return (
    <>
      <PegawaiAsnContainer />
    </>
  )
}

export default WithAuth(index)

