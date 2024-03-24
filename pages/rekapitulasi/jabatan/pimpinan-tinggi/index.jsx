import React from 'react'
import WithAuth from '@/components/shared/WithAuth'
import PimpinanTinggiContainer from '@/containers/PegawaiAsnContainers/Jabatan/PimpinanTinggi'

const index = () => {
  return (
    <>
      <PimpinanTinggiContainer />
    </>
  )
}

export default WithAuth(index)

