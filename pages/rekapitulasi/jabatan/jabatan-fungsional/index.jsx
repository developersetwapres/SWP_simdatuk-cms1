import React from 'react'
import WithAuth from '@/components/shared/WithAuth'
import JabatanFungsionalContainer from '@/containers/PegawaiAsnContainers/Jabatan/JabatanFungsionalContainer'

const index = () => {
  return (
    <>
      <JabatanFungsionalContainer />
    </>
  )
}

export default WithAuth(index)

