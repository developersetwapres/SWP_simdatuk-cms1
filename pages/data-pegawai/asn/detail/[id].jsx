import React from 'react'
import WithAuth from '@/components/shared/WithAuth'
import EmployeeDetailContainers from '@/containers/Employment/Employee/EmployeeDetailContainer'

const EmployeeDetailASN = () => {
  return <EmployeeDetailContainers />
}

export default WithAuth(EmployeeDetailASN)
