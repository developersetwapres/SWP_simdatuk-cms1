import React from 'react'
import RiwayatPelatihanFungsionalDetailPegawaiContainer from '@/containers/RiwayatContainer/PelatihanContainer/FungsionalContainer/RiwayatPelatihanFungsionalDetailPegawaiContainer'
import WithAuth from '@/components/shared/WithAuth'

const DetailPegawaiPelatihanFungsional = () => {
  return <RiwayatPelatihanFungsionalDetailPegawaiContainer />
}

export default WithAuth(DetailPegawaiPelatihanFungsional)
