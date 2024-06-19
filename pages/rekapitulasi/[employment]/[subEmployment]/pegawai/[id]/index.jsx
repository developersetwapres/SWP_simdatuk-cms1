import React from 'react'
import EmployeeDetailContainers from '@/containers/Employment/Employee/EmployeeDetailContainer'
import WithAuth from '@/components/shared/WithAuth'

const DetailEmployee = () => {
  return <EmployeeDetailContainers />
}

export default WithAuth(DetailEmployee)
