import React from 'react'
import RiwayatPelatihanFungsionalAddContainer from '@/containers/RiwayatContainer/PelatihanContainer/FungsionalContainer/RiwayatPelatihanFungsionalAddContainer'
import WithAuth from '@/components/shared/WithAuth'

const RiwayatPelatihanFungsionalAdd = () => {
  return <RiwayatPelatihanFungsionalAddContainer />
}

export default WithAuth(RiwayatPelatihanFungsionalAdd)
