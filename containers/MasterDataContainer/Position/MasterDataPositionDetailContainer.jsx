import React, { Component } from 'react'
import { connect } from 'react-redux'
import { mapStateToProps } from '@/store/'
import PropTypes from 'prop-types'
import { mapActions } from '@/store/'
import Layout from '@/components/core/Layout'
import MasterDataPositionDetailComponent from '@/components/MasterData/Position/MasterDataPositionDetailComponent'

export default connect(
  mapStateToProps('position'),
  mapActions('getPosition', 'deletePosition', 'clearRoleState')
)(
  class MasterDataPositionDetailContainer extends Component {
    static propTypes = {
      position: PropTypes.object,
      getPosition: PropTypes.func,
      deletePosition: PropTypes.func,
      clearRoleState: PropTypes.func
    }

    constructor(props) {
      super(props)
      this.state = {
        queries: {
          page: 1,
          limit: 10000,
          search: ''
        },
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
          <MasterDataPositionDetailComponent
            onLoading={this.setLoading}
            {...this.state}
            {...this.props}
          />
        </Layout>
      )
    }
  }
)
