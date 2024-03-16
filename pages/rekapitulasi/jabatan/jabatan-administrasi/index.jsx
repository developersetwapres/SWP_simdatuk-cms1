import React from 'react'
import WithAuth from '@/components/shared/WithAuth'
import JabatanAdministrasiContainer from '@/containers/pegawaiAsnContainer/jabatan/JabatanAdministrasiContainer'

const index = () => {
  return (
    <>
      <JabatanAdministrasiContainer />
    </>
  )
}

export default WithAuth(index)

