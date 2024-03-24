import React from 'react'
import WithAuth from '@/components/shared/WithAuth'
import PegawaiOutsourcingContainer from '@/containers/PegawaiOutsourcingContainer/PegawaiOutsourcingContainer'

const index = () => {
  return (
    <>
      <PegawaiOutsourcingContainer />
    </>
  )
}

export default WithAuth(index)

