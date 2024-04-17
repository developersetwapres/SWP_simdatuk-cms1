import React from 'react'
import WithAuth from '@/components/shared/WithAuth'
import ListPegawaiContainer from '@/containers/PegawaiNonAsnContainer/ListPegawai/ListPegawaiContainer'

const index = () => {
  return <ListPegawaiContainer />
}

export default WithAuth(index)
