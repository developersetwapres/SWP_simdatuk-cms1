import ResetPasswordComponent from '@/components/Auth/Reset-Password/ResetPasswordComponent'
import React, { Component } from 'react'

export default class ResetPassword extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <ResetPasswordComponent
        {...this.state}
        {...this.props}
      />
    )
  }
}
