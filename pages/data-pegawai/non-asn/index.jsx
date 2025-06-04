import React from 'react'
import WithAuth from '@/components/shared/WithAuth'
import EmployeeNonASNContainer from '@/containers/DataPegawaiContainer/Non-Asn/EmployeeNonASNContainer'

const index = () => {
  return <EmployeeNonASNContainer />
}

export default WithAuth(index)
