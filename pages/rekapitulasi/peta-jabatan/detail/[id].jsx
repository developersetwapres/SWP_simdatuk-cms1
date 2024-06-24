import React from 'react'
import WithAuth from '@/components/shared/WithAuth'
import EmployeeDetailContainer from '@/containers/Employment/Employee/EmployeeDetailContainer'

const index = () => {
  return <EmployeeDetailContainer />
}

export default WithAuth(index)
