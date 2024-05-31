import React from 'react'
import RiwayatPelatihanTeknisContainer from '@/containers/RiwayatContainer/PelatihanContainer/TeknisContainer/RiwayatPelatihanTeknisContainer'
import WithAuth from '@/components/shared/WithAuth'

const index = () => {
  return <RiwayatPelatihanTeknisContainer />
}

export default WithAuth(index)
