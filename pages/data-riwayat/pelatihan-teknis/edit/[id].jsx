import React from 'react'
import RiwayatPelatihanTeknisEditContainer from '@/containers/RiwayatContainer/PelatihanContainer/TeknisContainer/RiwayatPelatihanTeknisEditContainer'
import WithAuth from '@/components/shared/WithAuth'

const RiwayatPelatihanTeknisEdit = () => {
  return <RiwayatPelatihanTeknisEditContainer />
}

export default WithAuth(RiwayatPelatihanTeknisEdit)
