import UserBlacklistComponent from '@/components/users/blacklist/UserBlacklistComponent'
import React, { Component } from 'react'
import { mapStateToProps } from '@/store/'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { mapActions } from '@/store/'
import Layout from '@/components/core/Layout'

export default connect(
  mapStateToProps('blacklist', 'command'),
  mapActions(
    'getBlacklist',
    'getCommandUserPosition',
    'getCommandUserUnit',
    'getCommandUserLevel',
    'getCommandRoles'
  )
)(
  class UserBlacklistContainer extends Component {
    static propTypes = {
      blacklist: PropTypes.object,
      getBlacklist: PropTypes.func,
      getCommandUserPosition: PropTypes.func,
      getCommandUserUnit: PropTypes.func,
      getCommandUserLevel: PropTypes.func,
      getCommandRoles: PropTypes.func
    }

    constructor(props) {
      super(props)
      this.state = {
        queries: {
          page: 1,
          limit: 10,
          sortBy: '',
          sortDesc: '',
          search: '',
          position: '',
          unit: '',
          level: '',
          role: ''
        },
        willRender: false
      }
      this.fetch = this.fetch.bind(this)
      this.onPaginationChange = this.onPaginationChange.bind(this)
      this.onSearch = this.onSearch.bind(this)
      this.onPosition = this.onPosition.bind(this)
      this.onUnit = this.onUnit.bind(this)
      this.onLevel = this.onLevel.bind(this)
      this.onRole = this.onRole.bind(this)
      this.onClearState = this.onClearState.bind(this)
    }

    fetch(queries) {
      this.props.getBlacklist(queries)
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

    onPosition(value) {
      const queries = {
        ...this.state.queries,
        position: value || '',
        page: 1
      }
      this.setState({ queries })
      this.fetch(queries)
    }

    onUnit(value) {
      const queries = {
        ...this.state.queries,
        unit: value || '',
        page: 1
      }
      this.setState({ queries })
      this.fetch(queries)
    }

    onLevel(value) {
      const queries = {
        ...this.state.queries,
        level: value || '',
        page: 1
      }
      this.setState({ queries })
      this.fetch(queries)
    }

    onRole(value) {
      const queries = {
        ...this.state.queries,
        role: value || '',
        page: 1
      }
      this.setState({ queries })
      this.fetch(queries)
    }

    onClearState() {
      const queries = {
        ...this.state.queries,
        search: '',
        position: '',
        unit: '',
        level: '',
        role: '',
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
          <UserBlacklistComponent
            {...this.state}
            {...this.props}
            onPaginationChange={this.onPaginationChange}
            onSearch={this.onSearch}
            onPosition={this.onPosition}
            onUnit={this.onUnit}
            onLevel={this.onLevel}
            onRole={this.onRole}
            onClearState={this.onClearState}
          />
        </Layout>
      )
    }
  }
)