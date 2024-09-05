import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { mapActions, mapStateToProps } from '@/store/index'
import Layout from '@/components/core/Layout'
import EmployeeOutsourcingComponent from '@/components/DataPegawai/Outsourcing/EmployeeOutsourcingComponent'

export default connect(
  mapStateToProps('employee', 'grade', 'position', 'employmentType'),
  mapActions(
    'getEmployees',
    'getGradesOptions',
    'getPositions',
    'getEmploymentTypes',
    'clearPositionState',
    'deleteEmployee',
  )
)(
  class EmployeeOutsourcingContainer extends Component {
    static propTypes = {
      employee: PropTypes.object,
      grade: PropTypes.object,
      position: PropTypes.object,
      employmentType: PropTypes.object,
      getEmployees: PropTypes.func,
      getGradesOptions: PropTypes.func,
      getPositions: PropTypes.func,
      getEmploymentTypes: PropTypes.func,
      clearPositionState: PropTypes.func,
      deleteEmployee: PropTypes.func
    }

    constructor(props) {
      super(props)
      this.state = {
        queries: {
          page: 1,
          limit: '',
          search: ''
        },
        queriesEmployees: {
          page: 1,
          limit: 10,
          search: '',
          type: 3,
          positionId: '',
          gradeId: '',
          employmentType: '',
          religion: '',
          months: '',
          status: '',
          educationLevel: '',
          ageMin: '',
          ageMax: ''
        },
        willRender: false
      }
      this.fetch = this.fetch.bind(this)
      this.fetchFilter = this.fetchFilter.bind(this)
      this.mapKey = this.mapKey.bind(this)
      this.onPaginationChange = this.onPaginationChange.bind(this)
      this.onRowsPerPageChange = this.onRowsPerPageChange.bind(this)
      this.onSearch = this.onSearch.bind(this)
      this.onFilter = this.onFilter.bind(this)
      this.onClearState = this.onClearState.bind(this)
      this.setLoading = this.setLoading.bind(this)
    }

    fetch(queries) {
      this.props.getEmployees(queries)
    }

    fetchFilter(queries) {
      this.props.getGradesOptions(queries)
      this.props.getPositions({
        ...queries,
        filterParent: false,
        parentId: '',
        type: [3]
      })
      this.props.getEmploymentTypes({ ...queries, type: 3 })
    }

    mapKey(val) {
      switch (val) {
        case 'positionId':
          return 'position_id'
        case 'gradeId':
          return 'grade_id'
        case 'employmentType':
          return 'employment_type_id'
        case 'months':
          return 'month_of_birth'
        case 'status':
          return 'employment_status'
        case 'ageMin':
          return 'min_age'
        case 'ageMax':
          return 'max_age'
        case 'educationLevel':
          return 'education_level'
        default:
          return val
      }
    }

    filterParams(val) {
      const valuesFilter = Object.fromEntries(
        Object.entries(val)
          .filter(([key, val]) => {
            if (!['page', 'limit', 'search', 'type'].includes(key)) {
              return val !== null && val !== ''
            } else {
              return [key, val]
            }
          })
          .map(([key, val]) => [this.mapKey(key), val])
      )

      return valuesFilter
    }

    onPaginationChange(page) {
      const queriesEmployees = {
        ...this.state.queriesEmployees,
        page
      }
      this.setState({ queriesEmployees })
      this.fetch(this.filterParams(queriesEmployees))
    }

    onRowsPerPageChange(limit) {
      const queriesEmployees = {
        ...this.state.queriesEmployees,
        page: 1,
        limit
      }
      this.setState({ queriesEmployees })
      this.fetch(this.filterParams(queriesEmployees))
    }

    onSearch(value) {
      const queriesEmployees = {
        ...this.state.queriesEmployees,
        page: 1,
        limit: 10,
        search: value || ''
      }
      this.setState({ queriesEmployees })
      this.fetch(this.filterParams(queriesEmployees))
    }

    onFilter(val) {
      const { search, type } = this.state?.queriesEmployees
      const {
        position,
        grade,
        employmentType,
        educationLevel,
        religion,
        months,
        status,
        age
      } = val
      const newFilter = {
        page: 1,
        limit: 10,
        search,
        type,
        positionId: position,
        gradeId: grade,
        employmentType: employmentType,
        religion: religion,
        months: months,
        status: status,
        educationLevel: educationLevel,
        ageMin: age?.min,
        ageMax: age?.max
      }
      const valuesFilter = this.filterParams(newFilter)

      this.setState({ queriesEmployees: newFilter })
      this.fetch(valuesFilter)
    }

    onClearState() {
      const queriesEmployees = {
        ...this.state.queriesEmployees,
        page: 1,
        limit: 10,
        search: ''
      }
      this.setState({ queriesEmployees })
      this.fetch(this.filterParams(queriesEmployees))
    }

    setLoading(val) {
      this.setState({
        willRender: val
      })
    }

    componentDidMount() {
      this.fetch(this.filterParams(this.state.queriesEmployees))
      this.fetchFilter(this.state.queries)
    }

    render() {
      return (
        <Layout willRender={this.state.willRender}>
          <EmployeeOutsourcingComponent
            onSearch={this.onSearch}
            onFilter={this.onFilter}
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
