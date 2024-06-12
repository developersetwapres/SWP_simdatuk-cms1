import React, { Component } from 'react'
import Profile from '@/components/core/Profile'
import Layout from '@/components/core/Layout'
import { connect } from 'react-redux'
import { mapStateToProps, mapActions } from '../store'
import PropTypes from 'prop-types'

export default connect(
  mapStateToProps('authentication'),
  mapActions(
    'getProfile',
    'updateProfile'
  )
)(
  class ProfileContainer extends Component {
    static propTypes = {
      getProfile: PropTypes.func,
      updateProfile: PropTypes.func
    }

    constructor(props) {
      super(props)
      this.state = {
        willRender: false
      }
    }

    componentDidMount() {
      this.props.getProfile()
    }

    setLoading = (val) => {
      this.setState({ willRender: val })
    }

    render() {
      return (
        <Layout willRender={this.state.willRender}>
          <Profile
            {...this.state}
            {...this.props}
            setLoading={this.setLoading}
            updateProfile={this.props.updateProfile}
          />
        </Layout>
      )
    }
  }
)
