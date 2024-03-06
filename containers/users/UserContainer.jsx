import UserComponent from '@/components/users/UserComponent'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { mapStateToProps, mapActions } from '@/store/'
import Layout from '@/components/core/Layout'

export default connect(
  mapStateToProps('user', 'command', 'exportExcel'),
  mapActions(
    'getUsers',
    'deleteUser',
    'getCommandUserPosition',
    'getCommandUserUnit',
    'getCommandUserLevel',
    'getCommandRoles',
    'exportFileExcelUserList',
    'deleteListUser'
  )
)(
  class UserContainer extends Component {
    static propTypes = {
      user: PropTypes.object,
      command: PropTypes.object,
      getUsers: PropTypes.func,
      deleteUser: PropTypes.func,
      getCommandUserPosition: PropTypes.func,
      getCommandUserUnit: PropTypes.func,
      getCommandUserLevel: PropTypes.func,
      getCommandRoles: PropTypes.func,
      exportFileExcelUserList: PropTypes.func,
      deleteListUser: PropTypes.func
    }

    constructor(props) {
      super(props)
      this.state = {
        queries: {
          page: 1,
          limit: 10,
          search: '',
          sortBy: '',
          sortDesc: '',
          unitId: '',
          positionId: '',
          levelId: '',
          roleId: ''
        },
        willRender: false
      }
      this.fetch = this.fetch.bind(this)
      this.onPaginationChange = this.onPaginationChange.bind(this)
      this.onSearch = this.onSearch.bind(this)
      this.onFindUnit = this.onFindUnit.bind(this)
      this.onFindPosition = this.onFindPosition.bind(this)
      this.onFindLevel = this.onFindLevel.bind(this)
      this.onFindRole = this.onFindRole.bind(this)
      this.onClearFilter = this.onClearFilter.bind(this)
    }

    fetch(queries) {
      this.props.getUsers(queries)
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

    onFindUnit(value) {
      const queries = {
        ...this.state.queries,
        unitId: value || '',
        page: 1
      }
      this.setState({ queries })
      this.fetch(queries)
    }

    onFindPosition(value) {
      const queries = {
        ...this.state.queries,
        positionId: value || '',
        page: 1
      }
      this.setState({ queries })
      this.fetch(queries)
    }

    onFindLevel(value) {
      const queries = {
        ...this.state.queries,
        levelId: value || '',
        page: 1
      }

      this.setState({ queries })
      this.fetch(queries)
    }

    onFindRole(value) {
      const queries = {
        ...this.state.queries,
        roleId: value || '',
        page: 1
      }

      this.setState({ queries })
      this.fetch(queries)
    }

    onClearFilter() {
      const queries = {
        ...this.state.queries,
        search: '',
        unitId: '',
        levelId: '',
        positionId: '',
        roleId: '',
        page: 1
      }
      this.setState({ queries })
      this.fetch(queries)
    }

    componentDidMount() {
      this.fetch(this.state.queries)
      this.props.getCommandUserPosition()
      this.props.getCommandUserUnit()
      this.props.getCommandUserLevel()
      this.props.getCommandRoles()
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
          <UserComponent
            {...this.state}
            {...this.props}
            deleteUser={this.props.deleteListUser}
            onPaginationChange={this.onPaginationChange}
            onSearch={this.onSearch}
            onFindUnit={this.onFindUnit}
            onFindPosition={this.onFindPosition}
            onFindLevel={this.onFindLevel}
            onFindRole={this.onFindRole}
            onClearFilter={this.onClearFilter}
            exportFileExcelUserList={this.props.exportFileExcelUserList}
          />
        </Layout>
      )
    }
  }
)