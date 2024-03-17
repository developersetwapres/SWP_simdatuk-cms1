import React from 'react'
import WithAuth from '@/components/shared/WithAuth'
import PegawaiOutsourcingContainer from '@/containers/PegawaiOutsourcing/PegawaiOutsourcingContainer'

const index = () => {
  return (
    <>
      <PegawaiOutsourcingContainer />
    </>
  )
}

export default WithAuth(index)

