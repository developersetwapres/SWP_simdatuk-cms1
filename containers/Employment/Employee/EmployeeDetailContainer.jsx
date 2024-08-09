import React from 'react'
import Layout from '@/components/core/Layout'
import EmployeeDetailComponent from '@/components/Employment/Employee/EmployeeDetailComponent'
import { mapStateToProps, mapActions } from '@/store/index'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

export default connect(
  mapStateToProps('employee', 'exportEmployeeData', 'notes', 'employmentType'),
  mapActions(
    'getEmployee',
    'clearEmployeeState',
    'updateEmployee',
    'updateEmployeeStatus',
    'exportEmployeeDetail',
    'updateNotesByUserID',
    'getEmploymentTypes'
  )
)(
  class EmployeeDetailContainers extends React.Component {
    static propTypes = {
      employee: PropTypes.object,
      exportEmployeeData: PropTypes.object,
      notes: PropTypes.object,
      employmentType: PropTypes.object,
      getEmployee: PropTypes.func,
      clearEmployeeState: PropTypes.func,
      updateEmployeeStatus: PropTypes.func,
      exportEmployeeDetail: PropTypes.func,
      updateNotesByUserID: PropTypes.func,
      getEmploymentTypes: PropTypes.func
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
