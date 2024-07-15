import React, { Component } from 'react'
import { connect } from 'react-redux'
import { mapActions, mapStateToProps } from '@/store/index'
import Layout from '@/components/core/Layout'
import EmployeesComponent from '@/components/Employment/Employee/EmployeesComponent'

export default connect(
  mapStateToProps(),
  mapActions()
)(
  class EmployeesContainer extends Component {
    static propTypes = {}

    constructor(props) {
      super(props)
      this.state = {
        willRender: false,
        datas: {
          employees: []
        }
      }
    }

    componentDidMount() {
      setTimeout(() => {
        this.setState({
          willRender: true
        })
      }, 1000)
    }

    render() {
      return (
        <Layout willRender={this.state.willRender}>
          <EmployeesComponent {...this.state} {...this.props} />
        </Layout>
      )
    }
  }
)
