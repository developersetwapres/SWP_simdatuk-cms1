import React from 'react'
import WithAuth from '@/components/shared/WithAuth'
import EmployeeAddBulkContainer from '@/containers/DataPegawaiContainer/EmployeeAddBulkContainer'

const AddBulkEmployeeASN = () => {
  return <EmployeeAddBulkContainer />
}

export default WithAuth(AddBulkEmployeeASN)
