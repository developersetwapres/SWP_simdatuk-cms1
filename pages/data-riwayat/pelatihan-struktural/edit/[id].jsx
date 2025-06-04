import React from 'react'
import RiwayatPelatihanStrukturalEditContainer from '@/containers/RiwayatContainer/PelatihanContainer/StrukturalContainer/RiwayatPelatihanStrukturalEditContainer'
import WithAuth from '@/components/shared/WithAuth'

const RiwayatPelatihanStrukturalEdit = () => {
  return <RiwayatPelatihanStrukturalEditContainer />
}

export default WithAuth(RiwayatPelatihanStrukturalEdit)
