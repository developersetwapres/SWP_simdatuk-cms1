import React from 'react'
import WithAuth from '@/components/shared/WithAuth'
import ExportRekapitulasiContainer from '@/containers/export/rekapitulasi/ExportContainer'

const index = () => {
  return (
    <>
      <ExportRekapitulasiContainer />
    </>
  )
}

export default WithAuth(index)

