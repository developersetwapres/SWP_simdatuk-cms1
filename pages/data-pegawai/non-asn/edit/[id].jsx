import React from 'react'
import WithAuth from '@/components/shared/WithAuth'
import EmployeeEditNonASNContainer from '@/containers/DataPegawaiContainer/Non-Asn/EmployeeEditNonASNContainer'

const EditEmployeeASN = () => {
  return <EmployeeEditNonASNContainer />
}

export default WithAuth(EditEmployeeASN)
