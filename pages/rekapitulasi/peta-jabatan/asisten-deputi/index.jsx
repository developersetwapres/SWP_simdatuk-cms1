import React from 'react'
import WithAuth from '@/components/shared/WithAuth'
import AsistenDeputiContainer from '@/containers/petaJabatanContainer/asistenDeputi/AsistenDeputiContainer'

const index = () => {
  return (
    <>
      <AsistenDeputiContainer />
    </>
  )
}

export default WithAuth(index)

