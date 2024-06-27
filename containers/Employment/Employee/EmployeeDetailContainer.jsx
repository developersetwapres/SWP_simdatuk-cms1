import React from 'react'
import Layout from '@/components/core/Layout'
import EmployeeDetailComponent from '@/components/Employment/Employee/EmployeeDetailComponent'
import { mapStateToProps, mapActions } from '@/store/index'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

export default connect(
  mapStateToProps(
    'employee',
    'institution',
    'exportEmployeeData'
  ),
  mapActions(
    'getEmployee',
    'clearEmployeeState',
    'getInstitutionsOptions',
    'updateEmployee',
    'exportEmployeeDetail'
  )
)(
  class EmployeeDetailContainers extends React.Component {
    static propTypes = {
      employee: PropTypes.object,
      exportEmployeeData: PropTypes.object,
      getEmployee: PropTypes.func,
      clearEmployeeState: PropTypes.func,
      getInstitutionsOptions: PropTypes.func,
      updateEmployee: PropTypes.func,
      exportEmployeeDetail: PropTypes.func
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
      this.fetch = this.fetch.bind(this)
    }

    setRender(val) {
      this.setState({ willRender: val })
    }

    fetch(queries) {
      this.props.getInstitutionsOptions(queries)
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
