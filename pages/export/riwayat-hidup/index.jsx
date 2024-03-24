import React from 'react'
import WithAuth from '@/components/shared/WithAuth'
import ExportRiwayatHidupContainer from '@/containers/ExportContainer/RiwayatHidup/ExportRiwayatHidupContainer'

const index = () => {
  return (
    <>
      <ExportRiwayatHidupContainer />
    </>
  )
}

export default WithAuth(index)