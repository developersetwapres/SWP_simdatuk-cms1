import React from 'react'
import WithAuth from '@/components/shared/WithAuth'
import EmployeeAddASNContainer from '@/containers/DataPegawaiContainer/Asn/EmployeeAddASNContainer'

const AddEmployeeASN = () => {
  return <EmployeeAddASNContainer />
}

export default WithAuth(AddEmployeeASN)
