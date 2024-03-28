import React from 'react'
import WithAuth from '@/components/shared/WithAuth'
import BandingkanDataPegawaiContainer from '@/containers/BandingkanPegawaiContainer/BandingkanDataPegawaiContainer/BandingkanDataPegawaiContainer'

const index = () => {
  return (
    <>
      <BandingkanDataPegawaiContainer />
    </>
  )
}

export default WithAuth(index)

