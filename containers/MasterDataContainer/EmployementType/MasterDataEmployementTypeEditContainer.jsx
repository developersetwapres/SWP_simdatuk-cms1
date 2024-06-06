import React, { Component } from 'react'
import { connect } from 'react-redux'
import { mapStateToProps } from '@/store/'
import PropTypes from 'prop-types'
import { mapActions } from '@/store/'
import Layout from '@/components/core/Layout'
import MasterDataEmployementTypeEditComponent from '@/components/MasterData/EmployementType/MasterDataEmployementTypeEditComponent'

export default connect(
  mapStateToProps('role'),
  mapActions('getRole', 'getPermissions', 'updateRole', 'clearRoleState')
)(
  class MasterDataEmployementTypeEditContainer extends Component {
    static propTypes = {
      role: PropTypes.object,
      getRole: PropTypes.func,
      updateRole: PropTypes.func,
      getPermissions: PropTypes.func,
      clearRoleState: PropTypes.func
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
          <MasterDataEmployementTypeEditComponent
            onLoading={this.setLoading}
            {...this.state}
            {...this.props}
          />
        </Layout>
      )
    }
  }
)
