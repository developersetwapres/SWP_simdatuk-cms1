import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { mapActions, mapStateToProps } from '@/store/index'
import Layout from '@/components/core/Layout'
import EmployeeAddComponent from '@/components/DataPegawai/Asn/EmployeeAddComponent'

export default connect(
  mapStateToProps(
    'employee',
    'position',
    'echelon',
    'grade',
    'institution',
    'residence',
    'employmentType'
  ),
  mapActions(
    'postEmployee',
    'getPositions',
    'getEchelonsOptions',
    'getGradesOptions',
    'getInstitutionsOptions',
    'getResidences',
    'getEmploymentTypes'
  )
)(
  class EmployeeAddASNContainer extends Component {
    static propTypes = {
      employee: PropTypes.object,
      position: PropTypes.object,
      echelon: PropTypes.object,
      grade: PropTypes.object,
      institution: PropTypes.object,
      residence: PropTypes.object,
      employmentType: PropTypes.object,
      postEmployee: PropTypes.func,
      getPositions: PropTypes.func,
      getEchelonsOptions: PropTypes.func,
      getGradesOptions: PropTypes.func,
      getInstitutionsOptions: PropTypes.func,
      getResidences: PropTypes.func,
      getEmploymentTypes: PropTypes.func
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
      this.props.getEmploymentTypes({ ...queries, type: 1 })
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
          <EmployeeAddComponent
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
