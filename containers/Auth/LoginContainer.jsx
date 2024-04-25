// import { mapActio } from '@/store/'
import { mapStateToProps } from '@/store/'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { mapActions } from '@/store/index'
import LoginComponent from '@/components/Auth/LoginComponent'

export default connect(
  mapStateToProps('authentication'),
  mapActions('authenticationAction', 'forgetPassword')
)(
  class LoginContainer extends Component {
    static propTypes = {
      authentication: PropTypes.object,
      authenticationAction: PropTypes.func,
      forgetPassword: PropTypes.func
    }

    constructor(props) {
      super(props)
      this.state = {}
    }

    render() {
      return (
        <LoginComponent
          {...this.state}
          {...this.props}
          authentication={this.props.authenticationAction}
          forgetPassword={this.props.forgetPassword}
        />
      )
    }
  }
)
