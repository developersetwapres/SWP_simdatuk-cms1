import ActivityLogComponent from '@/components/users/activity-log/ActivityLogComponent'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { mapStateToProps } from '@/store/'
import { mapActions } from '@/store/'
import Layout from '@/components/core/Layout'
import { format } from 'date-fns'

export default connect(
  mapStateToProps('activitylog', 'command'),
  mapActions('getActivityLogs', 'getCommandRoles')
)(
  class ActivityLogContainer extends Component {
    static propTypes = {
      activitylog: PropTypes.object,
      getActivityLogs: PropTypes.func,
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
          role: '',
          startDate: '',
          endDate: ''
        },
        willRender: false
      }
      this.fetch = this.fetch.bind(this)
      this.onPaginationChange = this.onPaginationChange.bind(this)
      this.onSearch = this.onSearch.bind(this)
      this.onRole = this.onRole.bind(this)
      this.onClearFilter = this.onClearFilter.bind(this)
      this.onDate = this.onDate.bind(this)
    }

    fetch(queries) {
      this.props.getActivityLogs(queries)
    }

    onPaginationChange(page) {
      // const { limit, sortBy, sortDesc, search, role, startDate, endDate } = this.state.queries
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

    onClearFilter() {
      const queries = {
        ...this.state.queries,
        search: '',
        startDate: '',
        endDate: '',
        role: '',
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

    onDate(date) {
      const startHour = new Date(date[0])
      const endHour = new Date(date[1]).setHours(23, 59, 59, 999)
      const queries = {
        ...this.state.queries,
        startDate: format(startHour, 'yyyy-MM-dd HH:mm:ss'),
        endDate: format(endHour, 'yyyy-MM-dd HH:mm:ss'),
        page: 1
      }
      this.setState({ queries })
      this.fetch(queries)
    }

    componentDidMount() {
      this.fetch(this.state.queries)
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
          <ActivityLogComponent
            {...this.state}
            {...this.props}
            onPaginationChange={this.onPaginationChange}
            onSearch={this.onSearch}
            onClearFilter={this.onClearFilter}
            onRole={this.onRole}
            onDate={this.onDate}
          />
        </Layout>
      )
    }
  }
)
