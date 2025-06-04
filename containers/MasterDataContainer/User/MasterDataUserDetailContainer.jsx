import React, { Component } from 'react'
import { connect } from 'react-redux'
import { mapStateToProps } from '@/store/'
import PropTypes from 'prop-types'
import { mapActions } from '@/store/'
import Layout from '@/components/core/Layout'
import MasterDataUserDetailComponent from '@/components/MasterData/User/MasterDataUserDetailComponent'

export default connect(
  mapStateToProps('user'),
  mapActions('getUser', 'updateUserStatus', 'clearUserState')
)(
  class MasterDataUserDetailContainer extends Component {
    static propTypes = {
      user: PropTypes.object,
      getUser: PropTypes.func,
      updateUserStatus: PropTypes.func,
      clearUserState: PropTypes.func
    }

    constructor(props) {
      super(props)
      this.state = {
        willRender: false
      }
      this.setLoading = this.setLoading.bind(this)
    }

    setLoading(val) {
      this.setState({
        willRender: val
      })
    }

    render() {
      return (
        <Layout willRender={this.state.willRender}>
          <MasterDataUserDetailComponent
            onLoading={this.setLoading}
            {...this.state}
            {...this.props}
          />
        </Layout>
      )
    }
  }
)
