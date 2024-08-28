import React, { Component } from 'react'
import { connect } from 'react-redux'
import { mapStateToProps } from '@/store/'
import PropTypes from 'prop-types'
import { mapActions } from '@/store/'
import Layout from '@/components/core/Layout'
import ExportEmployeeComponent from '@/components/ExportComponent/Employee/ExportEmployeeComponent'

export default connect(
  mapStateToProps('echelon', 'grade', 'exportEmployeeData'),
  mapActions(
    'getEchelonsOptions',
    'getGradesOptions',
    'exportEmployees',
    'exportEmployeesPreview',
    'clearExportEmployeesState',
    'clearExportEmployeesPreviewState',
  )
)(
  class ExportEmployeeContainer extends Component {
    static propTypes = {
      grade: PropTypes.object,
      echelon: PropTypes.object,
      exportEmployeeData: PropTypes.object,
      getEchelonsOptions: PropTypes.func,
      getGradesOptions: PropTypes.func,
      exportEmployees: PropTypes.func,
      exportEmployeesPreview: PropTypes.func,
      clearExportEmployeesState: PropTypes.func,
      clearExportEmployeesPreviewState: PropTypes.func
    }

    constructor(props) {
      super(props)
      this.state = {
        queries: {
          page: 1,
          limit: 10,
          search: ''
        },
        queriesAll: {
          page: 1,
          limit: 9999,
          search: ''
        },
        willRender: false
      }
      this.fetchMasterData = this.fetchMasterData.bind(this)
      this.setLoading = this.setLoading.bind(this)
      this.onPaginationChange = this.onPaginationChange.bind(this)
      this.onRowsPerPageChange = this.onRowsPerPageChange.bind(this)
      this.onClearState = this.onClearState.bind(this)
    }

    fetchMasterData(queries) {
      this.props.getEchelonsOptions(queries)
      this.props.getGradesOptions(queries)
    }

    onPaginationChange(page, filter) {
      const queries = {
        ...this.state.queries,
        page
      }
      this.setState({ queries })
      this.props.exportEmployeesPreview({ ...queries, ...filter })
    }

    onRowsPerPageChange(limit, filter) {
      const queries = {
        ...this.state.queries,
        page: 1,
        limit
      }
      this.setState({ queries })
      this.props.exportEmployeesPreview({ ...queries, ...filter })
    }

    onClearState() {
      const queries = {
        ...this.state.queries,
        search: '',
        page: 1
      }
      this.setState({ queries })
      this.props.exportEmployeesPreview(queries)
    }

    setLoading(val) {
      this.setState({
        willRender: val
      })
    }

    componentDidMount() {
      this.fetchMasterData(this.state.queriesAll)
    }

    render() {
      return (
        <Layout willRender={this.state.willRender}>
          <ExportEmployeeComponent
            {...this.state}
            {...this.props}
            onLoading={this.setLoading}
            onPaginationChange={this.onPaginationChange}
            onRowsPerPageChange={this.onRowsPerPageChange}
          />
        </Layout>
      )
    }
  }
)
