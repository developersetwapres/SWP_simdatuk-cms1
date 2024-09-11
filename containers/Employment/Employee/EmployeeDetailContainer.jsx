import React from 'react'
import Layout from '@/components/core/Layout'
import EmployeeDetailComponent from '@/components/Employment/Employee/EmployeeDetailComponent'
import { mapStateToProps, mapActions } from '@/store/index'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

export default connect(
  mapStateToProps(
    'employee',
    'training',
    'exportEmployeeData',
    'notes',
    'employmentType',
    'position'
  ),
  mapActions(
    'getEmployee',
    'clearEmployeeState',
    'updateEmployee',
    'updateEmployeeStatus',
    'exportEmployeeDetail',
    'updateNotesByUserID',
    'getEmploymentTypes',
    'getPosition',
    'clearPositionState',
    'getLevels',
  )
)(
  class EmployeeDetailContainers extends React.Component {
    static propTypes = {
      employee: PropTypes.object,
      training: PropTypes.object,
      exportEmployeeData: PropTypes.object,
      notes: PropTypes.object,
      employmentType: PropTypes.object,
      position: PropTypes.object,
      getEmployee: PropTypes.func,
      clearEmployeeState: PropTypes.func,
      updateEmployeeStatus: PropTypes.func,
      exportEmployeeDetail: PropTypes.func,
      updateNotesByUserID: PropTypes.func,
      getEmploymentTypes: PropTypes.func,
      getPosition: PropTypes.func,
      getLevels: PropTypes.func,
      clearPositionState: PropTypes.func
    }

    constructor(props) {
      super(props)
      this.state = {
        willRender: false,
        queries: {
          page: 1,
          limit: '',
          search: ''
        }
      }
      this.setRender = this.setRender.bind(this)
      this.fetch = this.fetch.bind(this)
    }

    fetch(queries) {
      this.props.getEmploymentTypes({ ...queries, type: '' })
      this.props.getLevels({
        page: 1,
        limit: 9999,
        search: '',
        type: 1
      })
    }

    setRender(val) {
      this.setState({ willRender: val })
    }

    componentDidMount() {
      this.fetch(this.state.queries)
    }

    render() {
      return (
        <Layout willRender={this.state.willRender}>
          <EmployeeDetailComponent
            setRender={this.setRender}
            {...this.props}
            {...this.state}
          />
        </Layout>
      )
    }
  }
)
