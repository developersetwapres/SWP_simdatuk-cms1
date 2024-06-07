import React from 'react'
import ExportEmployeeContainer from '@/containers/ExportContainer/Employee/ExportEmployeeContainer'
import WithAuth from '@/components/shared/WithAuth'

const index = () => {
  return <ExportEmployeeContainer />
}

export default WithAuth(index)
