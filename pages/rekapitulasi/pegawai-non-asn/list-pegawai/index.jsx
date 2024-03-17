import React from 'react'
import WithAuth from '@/components/shared/WithAuth'
import ListPegawaiContainer from '@/containers/pegawaiNonAsn/list-pegawai/ListPegawaiContainer'

const index = () => {
  return (
    <>
      <ListPegawaiContainer />
    </>
  )
}

export default WithAuth(index)

