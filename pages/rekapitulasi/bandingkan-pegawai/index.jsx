import React from 'react'
import WithAuth from '@/components/shared/WithAuth'
import BandingkanPegawaiContainer from '@/containers/BandingkanPegawaiContainer/BandingkanPegawaiContainer'

const index = () => {
  return (
    <>
      <BandingkanPegawaiContainer />
    </>
  )
}

export default WithAuth(index)

