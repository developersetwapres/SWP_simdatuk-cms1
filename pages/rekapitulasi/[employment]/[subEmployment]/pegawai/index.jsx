/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'
import WithAuth from '@/components/shared/WithAuth'
import EmployeesContainer from '@/containers/Employment/Employee/EmployeesContainer'

const Employees = () => {
  return <EmployeesContainer />
}

export default WithAuth(Employees)
