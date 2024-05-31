import React from 'react'
import EmployeeOutsourcingContainer from '@/containers/DataPegawaiContainer/Outsourcing/EmployeeOutsourcingContainer'
import WithAuth from '@/components/shared/WithAuth'

const index = () => {
  return <EmployeeOutsourcingContainer />
}

export default WithAuth(index)
