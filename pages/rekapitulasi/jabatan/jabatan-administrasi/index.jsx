import React from 'react'
import WithAuth from '@/components/shared/WithAuth'
import JabatanAdministrasiContainer from '@/containers/PegawaiAsnContainers/Jabatan/JabatanAdministrasiContainer'

const index = () => {
  return (
    <>
      <JabatanAdministrasiContainer />
    </>
  )
}

export default WithAuth(index)

