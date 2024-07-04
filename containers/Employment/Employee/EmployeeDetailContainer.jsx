import React from 'react'
import Layout from '@/components/core/Layout'
import EmployeeDetailComponent from '@/components/Employment/Employee/EmployeeDetailComponent'
import { mapStateToProps, mapActions } from '@/store/index'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

export default connect(
  mapStateToProps('employee', 'exportEmployeeData', 'notes'),
  mapActions(
    'getEmployee',
    'clearEmployeeState',
    'updateEmployee',
    'updateEmployeeStatus',
    'exportEmployeeDetail',
    'updateNotesByUserID'
  )
)(
  class EmployeeDetailContainers extends React.Component {
    static propTypes = {
      employee: PropTypes.object,
      exportEmployeeData: PropTypes.object,
      notes: PropTypes.object,
      getEmployee: PropTypes.func,
      clearEmployeeState: PropTypes.func,
      updateEmployeeStatus: PropTypes.func,
      exportEmployeeDetail: PropTypes.func,
      updateNotesByUserID: PropTypes.func
    }

    constructor(props) {
      super(props)
      this.state = {
        willRender: false,
        queries: {
          page: 1,
          limit: 10000,
          search: ''
        }
      }
      this.setRender = this.setRender.bind(this)
    }

    setRender(val) {
      this.setState({ willRender: val })
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
