import React, { Component } from 'react'
import Profile from '@/components/core/Profile'
import { connect } from 'react-redux'
import { mapStateToProps, mapActions } from '../store'
import PropTypes from 'prop-types'

export default connect(
  mapStateToProps('command', 'authentication'),
  mapActions(
    'getUserMe',
    'getCommandUserPosition',
    'getCommandUserUnit',
    'getCommandUserLevel',
    'updateProfile'
  )
)(
  class ProfileContainer extends Component {
    static propTypes = {
      command: PropTypes.object,
      getUserMe: PropTypes.func,
      getCommandUserPosition: PropTypes.func,
      getCommandUserUnit: PropTypes.func,
      getCommandUserLevel: PropTypes.func,
      updateProfile: PropTypes.func
    }

    componentDidMount() {
      this.props.getUserMe()
    }
    render() {
      return (
        <Profile
          {...this.state}
          {...this.props}
          updateProfile={this.props.updateProfile}
        />
      )
    }
  }
)
