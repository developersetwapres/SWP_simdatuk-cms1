import React, { Component } from 'react'
import { connect } from 'react-redux'
import { mapStateToProps } from '@/store/'
import PropTypes from 'prop-types'
import { mapActions } from '@/store/'
import Layout from '@/components/core/Layout'
import MasterDataPositionAddComponent from '@/components/MasterData/Position/MasterDataPositionAddComponent'

export default connect(
  mapStateToProps('role'),
  mapActions('getPermissions', 'postRole')
)(
  class MasterDataPositionAddContainer extends Component {
    static propTypes = {
      role: PropTypes.object,
      getPermissions: PropTypes.func,
      postRole: PropTypes.func
    }

    constructor(props) {
      super(props)
      this.state = {
        willRender: false
      }
      this.fetch = this.fetch.bind(this)
      this.setLoading = this.setLoading.bind(this)
    }

    fetch() {
      this.props.getPermissions()
    }

    setLoading(val) {
      this.setState({
        willRender: val
      })
    }

    componentDidMount() {
      this.fetch()
    }

    render() {
      return (
        <Layout willRender={this.state.willRender}>
          <MasterDataPositionAddComponent
            onLoading={this.setLoading}
            {...this.state}
            {...this.props}
          />
        </Layout>
      )
    }
  }
)
