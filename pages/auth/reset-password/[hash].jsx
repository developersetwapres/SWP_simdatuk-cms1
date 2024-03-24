
import React from 'react'
import { withRouter } from 'next/router'
import ResetPasswordComponent from '@/components/Auth/Reset-Password/ResetPasswordComponent'

function index(props) {
  return (
    <ResetPasswordComponent
      {...props}
    />
  )
}

export default withRouter(index)