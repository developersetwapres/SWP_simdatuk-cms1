import { mapStateToProps } from '@/store/'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { mapActions } from '@/store/index'
import ResetPasswordComponent from '@/components/Auth/Reset-Password/ResetPasswordComponent'

export default connect(
  mapStateToProps(),
  mapActions('resetPassword')
)(
  class ResetPasswordContainer extends Component {
    static propTypes = {
      forgetPassword: PropTypes.func
    }

    constructor(props) {
      super(props)
      this.state = {}
    }

    componentDidMount() { }

    render() {
      return (
        <ResetPasswordComponent
          {...this.state}
          {...this.props}
          setLoading={this.setLoading}
        />
      )
    }
  }
)
