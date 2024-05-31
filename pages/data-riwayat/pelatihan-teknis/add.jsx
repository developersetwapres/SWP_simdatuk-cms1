import React from 'react'
import RiwayatPelatihanTeknisAddContainer from '@/containers/RiwayatContainer/PelatihanContainer/TeknisContainer/RiwayatPelatihanTeknisAddContainer'
import WithAuth from '@/components/shared/WithAuth'

const RiwayatPelatihanTeknisAdd = () => {
  return <RiwayatPelatihanTeknisAddContainer />
}

export default WithAuth(RiwayatPelatihanTeknisAdd)
