import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import EmployeeASNComponent from '@/components/DataPegawai/Asn/EmployeeASNComponent'
import { mapActions, mapStateToProps } from '@/store/index'
import Layout from '@/components/core/Layout'

export default connect(
  mapStateToProps('employee', 'echelon'),
  mapActions('getEmployees', 'getEchelons')
)(
  class EmployeeASNContainer extends Component {
    static propTypes = {
      employee: PropTypes.object,
      echelon: PropTypes.object,
      getEmployees: PropTypes.func,
      getEchelons: PropTypes.func
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
          type: 1
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
      this.props.getEchelons(queries)
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
      this.fetchFilter(this.state.queries)
    }

    render() {
      return (
        <Layout willRender={this.state.willRender}>
          <EmployeeASNComponent
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
