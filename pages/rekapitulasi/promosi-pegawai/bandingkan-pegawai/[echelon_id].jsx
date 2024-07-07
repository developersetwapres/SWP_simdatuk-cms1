import React from 'react'
import WithAuth from '@/components/shared/WithAuth'
import BandingkanPegawaiContainer from '@/containers/BandingkanPegawaiContainer/BandingkanPegawaiContainer'
import { useRouter } from 'next/router'

const BandingkanPegawai = () => {
  const router = useRouter()
  return <BandingkanPegawaiContainer router={router} />
}

export default WithAuth(BandingkanPegawai)
