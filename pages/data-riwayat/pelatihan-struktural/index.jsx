import React from 'react'
import RiwayatPelatihanStrukturalContainer from '@/containers/RiwayatContainer/PelatihanContainer/StrukturalContainer/RiwayatPelatihanStrukturalContainer'
import WithAuth from '@/components/shared/WithAuth'

const index = () => {
  return <RiwayatPelatihanStrukturalContainer />
}

export default WithAuth(index)
