import React from 'react'
import WithAuth from '@/components/shared/WithAuth'
import EmployeeAddBulkASNContainer from '@/containers/DataPegawaiContainer/Asn/EmployeeAddBulkASNContainer'

const AddBulkEmployeeASN = () => {
  return <EmployeeAddBulkASNContainer />
}

export default WithAuth(AddBulkEmployeeASN)
