import ResetPasswordComponent from '@/components/auth/reset-password/ResetPasswordComponent'
import React from 'react'
import { withRouter } from 'next/router'

function index(props) {
  return (
    <ResetPasswordComponent
      {...props}
    />
  )
}

export default withRouter(index)