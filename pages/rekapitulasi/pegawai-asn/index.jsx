import React from 'react'
import WithAuth from '@/components/shared/WithAuth'
import PegawaiAsnContainer from '@/containers/pegawaiAsnContainer/pegawaiAsnContainer'

const index = () => {
  return (
    <>
      <PegawaiAsnContainer />
    </>
  )
}

export default WithAuth(index)

