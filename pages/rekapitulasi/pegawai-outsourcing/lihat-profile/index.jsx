import React from 'react'
import WithAuth from '@/components/shared/WithAuth'
import LihatProfileContainer from '@/containers/pegawaiOutsourcing/lihat-profile/LihatProfileContainer'

const index = () => {
  return (
    <>
      <LihatProfileContainer />
    </>
  )
}

export default WithAuth(index)

