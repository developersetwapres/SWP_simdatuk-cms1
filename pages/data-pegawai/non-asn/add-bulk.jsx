import React from 'react'
import WithAuth from '@/components/shared/WithAuth'
import EmployeeAddBulkContainer from '@/containers/DataPegawaiContainer/EmployeeAddBulkContainer'

const AddBulkEmployeeNonASN = () => {
  return <EmployeeAddBulkContainer />
}

export default WithAuth(AddBulkEmployeeNonASN)
