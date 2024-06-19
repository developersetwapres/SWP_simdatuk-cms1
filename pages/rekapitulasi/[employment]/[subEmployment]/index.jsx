/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'
import WithAuth from '@/components/shared/WithAuth'
import SubEmployementContainer from '@/containers/Employment/SubEmployementContainer'

const index = () => {
  return <SubEmployementContainer />
}

export default WithAuth(index)
