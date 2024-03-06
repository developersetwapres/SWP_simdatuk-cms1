import UserRoleComponent from '@/components/users/role/UserRoleComponent'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { mapStateToProps } from '@/store/'
import { mapActions } from '@/store/'
import Layout from '@/components/core/Layout'

export default connect(
  mapStateToProps('role'),
  mapActions('getRoles', 'deleteRoleList')
)(
  class UserRoleContainer extends Component {
    static propTypes = {
      role: PropTypes.object,
      getRoles: PropTypes.func,
      deleteRoleList: PropTypes.func
    }

    constructor(props) {
      super(props)
      this.state = {
        queries: {
          page: 1,
          limit: 10,
          sortBy: '',
          sortDesc: '',
          search: ''
        },
        willRender: false
      }
      this.fetch = this.fetch.bind(this)
      this.onPaginationChange = this.onPaginationChange.bind(this)
      this.onSearch = this.onSearch.bind(this)
      this.onClearState = this.onClearState.bind(this)
    }

    fetch(queries) {
      this.props.getRoles(queries)
    }

    onPaginationChange(page) {
      const queries = {
        ...this.state.queries,
        page: page
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

    componentDidMount() {
      this.fetch(this.state.queries)
      setTimeout(() => {
        this.setState({
          willRender: true
        })
      }, 5000)
    }

    render() {
      return (
        <Layout
          willRender={this.state.willRender}
        >
          <UserRoleComponent
            {...this.state}
            {...this.props}
            onSearch={this.onSearch}
            onPaginationChange={this.onPaginationChange}
            deleteRoleList={this.props.deleteRoleList}
            onClearState={this.onClearState}
          />
        </Layout>
      )
    }
  }
)