import React, { Component } from 'react'
import { connect } from 'react-redux'
import { mapStateToProps } from '@/store/'
import PropTypes from 'prop-types'
import { mapActions } from '@/store/'
import Layout from '@/components/core/Layout'
import EmployeeDetailComponent from '@/components/Employment/Employee/EmployeeDetailComponent'

export default connect(
  mapStateToProps('employee', 'institution', 'exportEmployeeData'),
  mapActions(
    'updateEmployee',
    'getEmployee',
    'exportEmployeeDetail',
    'clearEmployeeState',
    'getInstitutionsOptions'
  )
)(
  class RiwayatHukumanDisiplinDetailPegawaiContainer extends Component {
    static propTypes = {
      employee: PropTypes.object,
      getEmployee: PropTypes.func,
      clearEmployeeState: PropTypes.func,
      exportEmployeeData: PropTypes.object,
      exportEmployeeDetail: PropTypes.func,
      getInstitutionsOptions: PropTypes.func
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
