import React from 'react'
import WithAuth from '@/components/shared/WithAuth'
import PegawaiNonAsnContainer from '@/containers/PegawaiNonAsnContainer/PegawaiNonAsnContainer'

const index = () => {
  return (
    <>
      <PegawaiNonAsnContainer />
    </>
  )
}

export default WithAuth(index)

