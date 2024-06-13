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
      forgetPassword: PropTypes.func,
      router: PropTypes.object
    }

    constructor(props) {
      super(props)
      this.state = {
        isNewPassword: false
      }
    }

    componentDidMount() {
      const path = this.props.router.pathname.split('/')[2]
      this.setState({
        isNewPassword: path.includes('new-password')
      })
    }

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
