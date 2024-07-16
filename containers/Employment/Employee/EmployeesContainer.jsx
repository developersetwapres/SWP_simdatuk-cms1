import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { mapActions, mapStateToProps } from '@/store/index'
import Layout from '@/components/core/Layout'
import EmployeesComponent from '@/components/Employment/Employee/EmployeesComponent'

export default connect(
  mapStateToProps('employeesRecap'),
  mapActions('getEmployeesRecap', 'clearEmployeesRecap')
)(
  class EmployeesContainer extends Component {
    static propTypes = {
      employeesRecap: PropTypes.object,
      getEmployeesRecap: PropTypes.func,
      clearEmployeesRecap: PropTypes.func
    }

    constructor(props) {
      super(props)
      this.state = {
        willRender: false,
        datas: {
          employees: []
        }
      }
      this.setLoading = this.setLoading.bind(this)
    }

    setLoading(val) {
      this.setState({
        willRender: val
      })
    }

    render() {
      return (
        <Layout willRender={this.state.willRender}>
          <EmployeesComponent
            onLoading={this.setLoading}
            {...this.state}
            {...this.props}
          />
        </Layout>
      )
    }
  }
)
