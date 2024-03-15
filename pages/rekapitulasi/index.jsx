import React from 'react'
import WithAuth from '@/components/shared/WithAuth'
import RekapitulasiContainer from '@/containers/rekapitulasiContainer/RekapitulasiContainer'

const index = () => {
  return (
    <>
      <RekapitulasiContainer />
    </>
  )
}

export default WithAuth(index)

