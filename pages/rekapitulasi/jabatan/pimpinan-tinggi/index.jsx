import React from 'react'
import WithAuth from '@/components/shared/WithAuth'
import PimpinanTinggiContainer from '@/containers/pegawaiAsnContainer/jabatan/PimpinanTinggi'

const index = () => {
  return (
    <>
      <PimpinanTinggiContainer />
    </>
  )
}

export default WithAuth(index)

