import React from 'react'
import WithAuth from '@/components/shared/WithAuth'
import EmployeeEditASNContainer from '@/containers/DataPegawaiContainer/Asn/EmployeeEditASNContainer'

const EditEmployeeASN = () => {
  return <EmployeeEditASNContainer />
}

export default WithAuth(EditEmployeeASN)
