import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { mapActions, mapStateToProps } from '@/store/index'
import Layout from '@/components/core/Layout'
import EmployeeAddBulkComponent from '@/components/DataPegawai/EmployeeAddBulkComponent'

export default connect(
  mapStateToProps('employee'),
  mapActions(
    'downloadTemplate',
    'uploadTemplate',
    'clearTemplate',
    'clearEmployeeState',
    'getActivitiesHistory',
  )
)(
  class EmployeeNonOutsourcingContainer extends Component {
    static propTypes = {
      employee: PropTypes.object,
      downloadTemplate: PropTypes.func,
      uploadTemplate: PropTypes.func,
      getActivitiesHistory: PropTypes.func,
      clearTemplate: PropTypes.func,
      clearEmployeeState: PropTypes.func
    }

    constructor(props) {
      super(props)
      this.state = {
        willRender: true,
        queries: {
          page: 1,
          limit: 10,
          type: 1,
          search: ''
        }
      }
      this.setLoading = this.setLoading.bind(this)
      this.onPaginationChange = this.onPaginationChange.bind(this)
      this.onRowsPerPageChange = this.onRowsPerPageChange.bind(this)
      this.onSearch = this.onSearch.bind(this)
      this.onClearState = this.onClearState.bind(this)
      this.fetch = this.fetch.bind(this)
    }

    onPaginationChange(page) {
      const queries = {
        ...this.state.queries,
        page
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

    fetch(queries) {
      this.props.getActivitiesHistory(queries)
    }

    componentDidMount() {
      this.fetch(this.state.queries)
    }

    setLoading(val) {
      this.setState({ willRender: val })
    }

    render() {
      return (
        <Layout willRender={this.state.willRender}>
          <EmployeeAddBulkComponent
            {...this.state}
            {...this.props}
            setLoading={this.setLoading}
            onPaginationChange={this.onPaginationChange}
            onRowsPerPageChange={this.onRowsPerPageChange}
          />
        </Layout>
      )
    }
  }
)
