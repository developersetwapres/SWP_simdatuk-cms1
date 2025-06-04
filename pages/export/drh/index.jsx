import React from 'react'
import ExportDrhContainer from '@/containers/ExportContainer/Drh/ExportDrhContainer'
import WithAuth from '@/components/shared/WithAuth'

const index = () => {
  return <ExportDrhContainer />
}

export default WithAuth(index)
