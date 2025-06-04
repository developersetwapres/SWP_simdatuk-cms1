import React from 'react'
import RiwayatPelatihanFungsionalContainer from '@/containers/RiwayatContainer/PelatihanContainer/FungsionalContainer/RiwayatPelatihanFungsionalContainer'
import WithAuth from '@/components/shared/WithAuth'

const index = () => {
  return <RiwayatPelatihanFungsionalContainer />
}

export default WithAuth(index)
