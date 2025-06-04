import React from 'react'
import RiwayatPelatihanStrukturalAddContainer from '@/containers/RiwayatContainer/PelatihanContainer/StrukturalContainer/RiwayatPelatihanStrukturalAddContainer'
import WithAuth from '@/components/shared/WithAuth'

const RiwayatPelatihanStrukturalAdd = () => {
  return <RiwayatPelatihanStrukturalAddContainer />
}

export default WithAuth(RiwayatPelatihanStrukturalAdd)
