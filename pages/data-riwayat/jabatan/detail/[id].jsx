import React from 'react'
import RiwayatJabatanDetailContainer from '@/containers/RiwayatContainer/JabatanContainer/RiwayatJabatanDetailContainer'
import WithAuth from '@/components/shared/WithAuth'

const DetailRiwayatJabatan = () => {
  return <RiwayatJabatanDetailContainer />
}

export default WithAuth(DetailRiwayatJabatan)
