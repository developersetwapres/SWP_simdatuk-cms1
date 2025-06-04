/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'
import WithAuth from '@/components/shared/WithAuth'
import EmploymentContainer from '@/containers/Employment/EmployementContainer'

const Employment = () => {
  return <EmploymentContainer />
}

export default WithAuth(Employment)
