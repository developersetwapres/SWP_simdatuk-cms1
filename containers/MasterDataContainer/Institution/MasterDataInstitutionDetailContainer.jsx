import React, { Component } from 'react'
import { connect } from 'react-redux'
import { mapStateToProps } from '@/store/'
import PropTypes from 'prop-types'
import { mapActions } from '@/store/'
import Layout from '@/components/core/Layout'
import MasterDataInstitutionDetailComponent from '@/components/MasterData/Institution/MasterDataInstitutionDetailComponent'

export default connect(
  mapStateToProps('role'),
  mapActions(
    'getRole',
    'deleteRole',
    'getRolesOptions',
    'getPermissions',
    'clearRoleState'
  )
)(
  class MasterDataInstitutionDetailContainer extends Component {
    static propTypes = {
      role: PropTypes.object,
      getRole: PropTypes.func,
      deleteRole: PropTypes.func,
      getRolesOptions: PropTypes.func,
      getPermissions: PropTypes.func,
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
      this.fetch = this.fetch.bind(this)
      this.setLoading = this.setLoading.bind(this)
      this.fetchGetRolesOptions = this.fetchGetRolesOptions.bind(this)
    }

    fetch() {
      this.props.getPermissions()
    }

    fetchGetRolesOptions(queries) {
      this.props.getRolesOptions(queries)
    }

    setLoading(val) {
      this.setState({
        willRender: val
      })
    }

    componentDidMount() {
      this.fetch()
      this.fetchGetRolesOptions(this.state.queries)
    }

    render() {
      return (
        <Layout willRender={this.state.willRender}>
          <MasterDataInstitutionDetailComponent
            onLoading={this.setLoading}
            {...this.state}
            {...this.props}
          />
        </Layout>
      )
    }
  }
)
