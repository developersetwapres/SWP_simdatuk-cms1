import React from 'react'
import EmployeeAddBulkOutsourcingContainer from '@/containers/DataPegawaiContainer/Outsourcing/EmployeeAddBulkOutsourcingContainer'
import WithAuth from '@/components/shared/WithAuth'

const AddBulkEmployeeOutsourcing = () => {
  return <EmployeeAddBulkOutsourcingContainer />
}

export default WithAuth(AddBulkEmployeeOutsourcing)
