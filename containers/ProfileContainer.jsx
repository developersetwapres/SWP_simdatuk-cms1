import React, { Component } from 'react'
import Profile from '@/components/core/Profile'
import Layout from '@/components/core/Layout'
import { connect } from 'react-redux'
import { mapStateToProps, mapActions } from '../store'
import PropTypes from 'prop-types'

export default connect(
  mapStateToProps('command', 'authentication'),
  mapActions(
    'getUser',
    'getCommandUserPosition',
    'getCommandUserUnit',
    'getCommandUserLevel',
    // 'updateProfile'
  )
)(
  class ProfileContainer extends Component {
    static propTypes = {
      command: PropTypes.object,
      getUser: PropTypes.func,
      getCommandUserPosition: PropTypes.func,
      getCommandUserUnit: PropTypes.func,
      getCommandUserLevel: PropTypes.func,
      updateProfile: PropTypes.func
    }

    constructor(props) {
      super(props)
      this.state = {
        willRender: false
      }
    }

    componentDidMount() { }

    render() {
      return (
        <Layout willRender>
          <Profile
            {...this.state}
            {...this.props}
            updateProfile={this.props.updateProfile}
          />
        </Layout>
      )
    }
  }
)
