
import React from 'react'
import { withRouter } from 'next/router'
import ResetPasswordContainer from '@/containers/Auth/ResetPasswordContainer'

function index(props) {
  return (
    <ResetPasswordContainer
      {...props}
    />
  )
}

export default withRouter(index)