import React from 'react'
import WithAuth from '@/components/shared/WithAuth'
import BandingkanPegawaiContainer from '@/containers/BandingkanPegawaiContainer/BandingkanPegawaiContainer'

const BandingkanPegawai = () => {
  return <BandingkanPegawaiContainer />
}

export default WithAuth(BandingkanPegawai)
