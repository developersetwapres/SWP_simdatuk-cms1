import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { mapActions, mapStateToProps } from '@/store/index'
import Layout from '@/components/core/Layout'
import EmployeeEditComponent from '@/components/DataPegawai/Outsourcing/EmployeeEditComponent'

export default connect(
  mapStateToProps('employee', 'position', 'residence', 'employmentType'),
  mapActions(
    'getEmployee',
    'updateEmployee',
    'clearEmployeeState',
    'getPositions',
    'getResidences',
    'getEmploymentTypes'
  )
)(
  class EmployeeEditOutsourcingContainer extends Component {
    static propTypes = {
      employee: PropTypes.object,
      position: PropTypes.object,
      residence: PropTypes.object,
      employmentType: PropTypes.object,
      getEmployee: PropTypes.func,
      updateEmployee: PropTypes.func,
      clearEmployeeState: PropTypes.func,
      getPositions: PropTypes.func,
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
      this.props.getResidences(queries)
      this.props.getEmploymentTypes({ ...queries, type: 3 })
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
