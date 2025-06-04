import React from 'react'
import WithAuth from '@/components/shared/WithAuth'
import EmployeeAddNonASNContainer from '@/containers/DataPegawaiContainer/Non-Asn/EmployeeAddNonASNContainer'

const AddEmployeeNonASN = () => {
  return <EmployeeAddNonASNContainer />
}

export default WithAuth(AddEmployeeNonASN)
