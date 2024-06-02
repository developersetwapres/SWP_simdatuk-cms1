import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { mapActions, mapStateToProps } from '@/store/index'
import Layout from '@/components/core/Layout'
import EmployeeNonASNComponent from '@/components/DataPegawai/Non-Asn/EmployeeNonASNComponent'

export default connect(
  mapStateToProps('employee'),
  mapActions('getEmployees')
)(
  class EmployeeNonASNContainer extends Component {
    static propTypes = {
      employee: PropTypes.object,
      getEmployees: PropTypes.func
    }

    constructor(props) {
      super(props)
      this.state = {
        queries: {
          page: 1,
          limit: 10000,
          search: ''
        },
        queriesEmployees: {
          page: 1,
          limit: 10,
          search: '',
          type: 2
        },
        willRender: false
      }
      this.fetch = this.fetch.bind(this)
      this.fetchFilter = this.fetchFilter.bind(this)
      this.onPaginationChange = this.onPaginationChange.bind(this)
      this.onRowsPerPageChange = this.onRowsPerPageChange.bind(this)
      this.onSearch = this.onSearch.bind(this)
      this.onClearState = this.onClearState.bind(this)
      this.setLoading = this.setLoading.bind(this)
    }

    fetch(queries) {
      this.props.getEmployees(queries)
    }

    fetchFilter(queries) {
      console.log('queries', queries)
    }

    onPaginationChange(page) {
      const queriesEmployees = {
        ...this.state.queriesEmployees,
        page
      }
      this.setState({ queriesEmployees })
      this.fetch(queriesEmployees)
    }

    onRowsPerPageChange(limit) {
      const queriesEmployees = {
        ...this.state.queriesEmployees,
        page: 1,
        limit
      }
      this.setState({ queriesEmployees })
      this.fetch(queriesEmployees)
    }

    onSearch(value) {
      const queriesEmployees = {
        ...this.state.queriesEmployees,
        search: value || '',
        page: 1
      }
      this.setState({ queriesEmployees })
      this.fetch(queriesEmployees)
    }

    onClearState() {
      const queriesEmployees = {
        ...this.state.queriesEmployees,
        search: '',
        page: 1
      }
      this.setState({ queriesEmployees })
      this.fetch(queriesEmployees)
    }

    setLoading(val) {
      this.setState({
        willRender: val
      })
    }

    componentDidMount() {
      this.fetch(this.state.queriesEmployees)
      // this.fetchFilter(this.state.queries)
    }

    render() {
      return (
        <Layout willRender={this.state.willRender}>
          <EmployeeNonASNComponent
            onSearch={this.onSearch}
            onLoading={this.setLoading}
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
