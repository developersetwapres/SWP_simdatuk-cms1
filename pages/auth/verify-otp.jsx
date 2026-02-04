import React, { Component } from 'react'
import OTPVerificationContainer from '@/containers/Auth/OTPVerificationContainer'

export default class VerifyOTP extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return <OTPVerificationContainer {...this.state} {...this.props} />
  }
}
