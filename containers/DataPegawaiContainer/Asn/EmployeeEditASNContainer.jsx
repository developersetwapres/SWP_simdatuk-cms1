import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { mapActions, mapStateToProps } from '@/store/index'
import Layout from '@/components/core/Layout'
import EmployeeEditComponent from '@/components/DataPegawai/Asn/EmployeeEditComponent'

export default connect(
  mapStateToProps(
    'employee',
    'position',
    'echelon',
    'grade',
    'institution',
    'residence',
    'employmentType',
    'decree',
    'disciplinary',
    'group'
  ),
  mapActions(
    'getEmployee',
    'updateEmployee',
    'clearEmployeeState',
    'getPositions',
    'getEchelonsOptions',
    'getGradesOptions',
    'getInstitutionsOptions',
    'getResidences',
    'getEmploymentTypes',
    'getDecrees',
    'getDisciplinariesOptions',
    'getGroups'
  )
)(
  class EmployeeEditASNContainer extends Component {
    static propTypes = {
      employee: PropTypes.object,
      position: PropTypes.object,
      echelon: PropTypes.object,
      grade: PropTypes.object,
      institution: PropTypes.object,
      residence: PropTypes.object,
      employmentType: PropTypes.object,
      decree: PropTypes.object,
      disciplinary: PropTypes.object,
      group: PropTypes.object,
      getEmployee: PropTypes.func,
      updateEmployee: PropTypes.func,
      clearEmployeeState: PropTypes.func,
      getPositions: PropTypes.func,
      getEchelonsOptions: PropTypes.func,
      getGradesOptions: PropTypes.func,
      getInstitutionsOptions: PropTypes.func,
      getResidences: PropTypes.func,
      getEmploymentTypes: PropTypes.func,
      getDecrees: PropTypes.func,
      getDisciplinariesOptions: PropTypes.func,
      getGroups: PropTypes.func
    }

    constructor(props) {
      super(props)
      this.state = {
        queries: {
          page: 1,
          limit: 10000,
          search: ''
        },
        willRender: false
      }
      this.fetch = this.fetch.bind(this)
      this.fetchHierarchy = this.fetchHierarchy.bind(this)
      this.setLoading = this.setLoading.bind(this)
    }

    fetch(queries) {
      this.props.getPositions({ ...queries, filterParent: true, parentId: '' })
      this.props.getEchelonsOptions(queries)
      this.props.getGradesOptions(queries)
      this.props.getInstitutionsOptions(queries)
      this.props.getResidences(queries)
      this.props.getDecrees(queries)
      this.props.getDisciplinariesOptions()
      this.props.getEmploymentTypes({ ...queries, type: 1 })
      this.props.getGroups(queries)
    }

    fetchHierarchy(val) {
      this.props.getPositions({
        ...this.state.queries,
        filterParent: true,
        parentId: val
      })
    }

    setLoading(val) {
      this.setState({
        willRender: val
      })
    }

    componentDidMount() {
      this.fetch(this.state.queries)
    }

    render() {
      return (
        <Layout willRender={this.state.willRender}>
          <EmployeeEditComponent
            onLoading={this.setLoading}
            onFetchHierarchy={this.fetchHierarchy}
            {...this.state}
            {...this.props}
          />
        </Layout>
      )
    }
  }
)
