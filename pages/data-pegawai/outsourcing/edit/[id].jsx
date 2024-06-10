import React from 'react'
import WithAuth from '@/components/shared/WithAuth'
import EmployeeEditOutsourcingContainer from '@/containers/DataPegawaiContainer/Outsourcing/EmployeeEditOutsourcingContainer'

const EditEmployeeASN = () => {
  return <EmployeeEditOutsourcingContainer />
}

export default WithAuth(EditEmployeeASN)
