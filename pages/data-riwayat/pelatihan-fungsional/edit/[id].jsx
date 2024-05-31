import React from 'react'
import RiwayatPelatihanFungsionalEditContainer from '@/containers/RiwayatContainer/PelatihanContainer/FungsionalContainer/RiwayatPelatihanFungsionalEditContainer'
import WithAuth from '@/components/shared/WithAuth'

const RiwayatPelatihanFungsionalEdit = () => {
  return <RiwayatPelatihanFungsionalEditContainer />
}

export default WithAuth(RiwayatPelatihanFungsionalEdit)
