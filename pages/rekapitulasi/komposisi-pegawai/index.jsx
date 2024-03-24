import React from 'react'
import WithAuth from '@/components/shared/WithAuth'
import EmployeeContainer from '@/containers/Employee/EmployeeContainer'

const index = () => {
  return (
    <>
      <EmployeeContainer />
    </>
  )
}

export default WithAuth(index)

