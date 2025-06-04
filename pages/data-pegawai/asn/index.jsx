import React from 'react'
import WithAuth from '@/components/shared/WithAuth'
import EmployeeASNContainer from '@/containers/DataPegawaiContainer/Asn/EmployeeASNContainer'

const index = () => {
  return <EmployeeASNContainer />
}

export default WithAuth(index)
