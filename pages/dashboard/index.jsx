import React from 'react'
import WithAuth from '@/components/shared/WithAuth'
import DashboardContainer from '@/containers/Dashboard/DashboardContainer'

const index = (props) => {
  return <DashboardContainer {...props} />
}

export default WithAuth(index)
