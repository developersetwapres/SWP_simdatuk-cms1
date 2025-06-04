import React from 'react'
import RiwayatPelatihanFungsionalDetailContainer from '@/containers/RiwayatContainer/PelatihanContainer/FungsionalContainer/RiwayatPelatihanFungsionalDetailContainer'
import WithAuth from '@/components/shared/WithAuth'

const DetailRiwayatPelatihanFungsional = () => {
  return <RiwayatPelatihanFungsionalDetailContainer />
}

export default WithAuth(DetailRiwayatPelatihanFungsional)
