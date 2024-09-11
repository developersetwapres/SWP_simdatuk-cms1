import React, { Component } from 'react'
import { connect } from 'react-redux'
import { mapStateToProps } from '@/store/'
import PropTypes from 'prop-types'
import { mapActions } from '@/store/'
import Layout from '@/components/core/Layout'
import EmployeeDetailComponent from '@/components/Employment/Employee/EmployeeDetailComponent'

export default connect(
  mapStateToProps('employee', 'institution', 'exportEmployeeData', 'training'),
  mapActions(
    'updateEmployee',
    'getEmployee',
    'clearEmployeeState',
    'getInstitutionsOptions',
    'exportEmployeeDetail',
    'getLevels',
  )
)(
  class RiwayatPenghargaanDetailPegawaiContainer extends Component {
    static propTypes = {
      employee: PropTypes.object,
      training: PropTypes.object,
      residence: PropTypes.object,
      getEmployee: PropTypes.func,
      getInstitutionsOptions: PropTypes.func,
      clearEmployeeState: PropTypes.func,
      exportEmployeeData: PropTypes.object,
      exportEmployeeDetail: PropTypes.func,
      getLevels: PropTypes.func
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
      this.props.getLevels({
        page: 1,
        limit: 9999,
        search: '',
        type: 1
      })
    }

    componentDidMount() {
      this.fetch(this.state.queries)
    }

    render() {
      return (
        <Layout willRender={this.state.willRender}>
          <EmployeeDetailComponent
            setRender={this.setRender}
            {...this.state}
            {...this.props}
          />
        </Layout>
      )
    }
  }
)
