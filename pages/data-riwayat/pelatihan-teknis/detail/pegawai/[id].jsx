import React from 'react'
import RiwayatPelatihanTeknisDetailPegawaiContainer from '@/containers/RiwayatContainer/PelatihanContainer/TeknisContainer/RiwayatPelatihanTeknisDetailPegawaiContainer'
import WithAuth from '@/components/shared/WithAuth'

const DetailPegawaiPelatihanTeknis = () => {
  return <RiwayatPelatihanTeknisDetailPegawaiContainer />
}

export default WithAuth(DetailPegawaiPelatihanTeknis)
