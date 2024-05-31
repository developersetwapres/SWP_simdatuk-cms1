import React, { Component } from 'react'
import { connect } from 'react-redux'
import { mapStateToProps } from '@/store/'
import PropTypes from 'prop-types'
import { mapActions } from '@/store/'
import Layout from '@/components/core/Layout'
import MasterDataRoleComponent from '@/components/MasterData/Role/MasterDataRoleComponent'

export default connect(
  mapStateToProps('role'),
  mapActions('getRoles', 'getRolesOptions', 'deleteRole')
)(
  class MasterDataRoleContainer extends Component {
    static propTypes = {
      role: PropTypes.object,
      getRoles: PropTypes.func,
      getRolesOptions: PropTypes.func,
      deleteRole: PropTypes.func
    }

    constructor(props) {
      super(props)
      this.state = {
        queries: {
          page: 1,
          limit: 10,
          search: ''
        },
        willRender: false
      }
      this.fetch = this.fetch.bind(this)
      this.fetchGetRolesOptions = this.fetchGetRolesOptions.bind(this)
      this.onPaginationChange = this.onPaginationChange.bind(this)
      this.onRowsPerPageChange = this.onRowsPerPageChange.bind(this)
      this.onSearch = this.onSearch.bind(this)
      this.onClearState = this.onClearState.bind(this)
      this.setLoading = this.setLoading.bind(this)
    }

    fetch(queries) {
      this.props.getRoles(queries)
    }

    fetchGetRolesOptions() {
      this.props.getRolesOptions({
        page: 1,
        limit: 10000,
        search: ''
      })
    }

    onPaginationChange(page) {
      const queries = {
        ...this.state.queries,
        page: page
      }
      this.setState({ queries })
      this.fetch(queries)
    }

    onRowsPerPageChange(limit) {
      const queries = {
        ...this.state.queries,
        page: 1,
        limit
      }
      this.setState({ queries })
      this.fetch(queries)
    }

    onSearch(value) {
      const queries = {
        ...this.state.queries,
        search: value || '',
        page: 1
      }
      this.setState({ queries })
      this.fetch(queries)
    }

    onClearState() {
      const queries = {
        ...this.state.queries,
        search: '',
        page: 1
      }
      this.setState({ queries })
      this.fetch(queries)
    }

    setLoading(val) {
      this.setState({
        willRender: val
      })
    }

    componentDidMount() {
      this.fetch(this.state.queries)
      this.fetchGetRolesOptions()
    }

    render() {
      return (
        <Layout willRender={this.state.willRender}>
          <MasterDataRoleComponent
            onSearch={this.onSearch}
            onLoading={this.setLoading}
            onFetch={this.fetch}
            onFetchOptions={this.fetchGetRolesOptions}
            onPaginationChange={this.onPaginationChange}
            onRowsPerPageChange={this.onRowsPerPageChange}
            {...this.state}
            {...this.props}
          />
        </Layout>
      )
    }
  }
)
