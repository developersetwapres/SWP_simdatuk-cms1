import React from 'react'
import RiwayatPelatihanTeknisDetailContainer from '@/containers/RiwayatContainer/PelatihanContainer/TeknisContainer/RiwayatPelatihanTeknisDetailContainer'
import WithAuth from '@/components/shared/WithAuth'

const DetailRiwayatPelatihanTeknis = () => {
  return <RiwayatPelatihanTeknisDetailContainer />
}

export default WithAuth(DetailRiwayatPelatihanTeknis)
