import React from 'react'
import WithAuth from '@/components/shared/WithAuth'
import EmployeeAddOutsourcingContainer from '@/containers/DataPegawaiContainer/Outsourcing/EmployeeAddOutsourcingContainer'

const AddEmployeeOutsourcing = () => {
  return <EmployeeAddOutsourcingContainer />
}

export default WithAuth(AddEmployeeOutsourcing)
