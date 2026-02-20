import { mapStateToProps } from '@/store/'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { mapActions } from '@/store/index'
import OTPVerificationComponent from '@/components/Auth/OTPVerificationComponent'

export default connect(
  mapStateToProps('authentication'),
  mapActions('verifyOTP', 'forgetPassword')
)(
  class OTPVerificationContainer extends Component {
    static propTypes = {
      verifyOTP: PropTypes.func,
      forgetPassword: PropTypes.func
    }

    constructor(props) {
      super(props)
      this.state = {}
    }

    render() {
      return (
        <OTPVerificationComponent
          {...this.state}
          {...this.props}
        />
      )
    }
  }
)
