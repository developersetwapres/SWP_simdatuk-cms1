import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { mapActions, mapStateToProps } from '@/store/index'
import Layout from '@/components/core/Layout'
import EmployeeAddComponent from '@/components/DataPegawai/Outsourcing/EmployeeAddComponent'

export default connect(
  mapStateToProps('employee', 'position', 'residence', 'employmentType'),
  mapActions(
    'postEmployee',
    'getPositions',
    'getResidences',
    'getEmploymentTypes'
  )
)(
  class EmployeeAddOutsourcingContainer extends Component {
    static propTypes = {
      employee: PropTypes.object,
      position: PropTypes.object,
      residence: PropTypes.object,
      employmentType: PropTypes.object,
      postEmployee: PropTypes.func,
      getPositions: PropTypes.func,
      getResidences: PropTypes.func,
      getEmploymentTypes: PropTypes.func
    }

    constructor(props) {
      super(props)
      this.state = {
        queries: {
          page: 1,
          limit: '',
          search: ''
        },
        willRender: false
      }
      this.fetch = this.fetch.bind(this)
      this.fetchHierarchy = this.fetchHierarchy.bind(this)
      this.setLoading = this.setLoading.bind(this)
    }

    fetch(queries) {
      this.props.getPositions({
        ...queries,
        filterParent: true,
        parentId: '',
        type: [3]
      })
      this.props.getResidences(queries)
      this.props.getEmploymentTypes({ ...queries, type: 3 })
    }

    fetchHierarchy(val) {
      this.props.getPositions({
        ...this.state.queries,
        filterParent: true,
        parentId: val,
        type: []
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
