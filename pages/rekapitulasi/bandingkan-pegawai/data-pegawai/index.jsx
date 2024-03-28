import React from 'react'
import WithAuth from '@/components/shared/WithAuth'
import DataPegawaiContainer from '@/containers/BandingkanPegawaiContainer/DataPegawaiContainer/DataPegawaiContainer'

const index = () => {
  return (
    <>
      <DataPegawaiContainer />
    </>
  )
}

export default WithAuth(index)

