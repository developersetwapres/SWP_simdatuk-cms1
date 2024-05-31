import React from 'react'
import WithAuth from '@/components/shared/WithAuth'
import EmployeeAddBulkNonASNContainer from '@/containers/DataPegawaiContainer/Non-Asn/EmployeeAddBulkNonASNContainer'

const AddBulkEmployeeNonASN = () => {
  return <EmployeeAddBulkNonASNContainer />
}

export default WithAuth(AddBulkEmployeeNonASN)
