import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { mapActions, mapStateToProps } from '@/store/index'
import Layout from '@/components/core/Layout'
import EmployeeOutsourcingComponent from '@/components/DataPegawai/Outsourcing/EmployeeOutsourcingComponent'

export default connect(
  mapStateToProps(),
  mapActions()
)(
  class EmployeeOutsourcingContainer extends Component {
    static propTypes = {
      data: PropTypes.object
    }

    constructor(props) {
      super(props)
      this.state = {
        willRender: false
      }
    }

    componentDidMount() {
      setTimeout(() => {
        this.setState({
          willRender: true
        })
      }, 2000)
    }

    render() {
      return (
        <Layout willRender={this.state.willRender}>
          <EmployeeOutsourcingComponent {...this.state} {...this.props} />
        </Layout>
      )
    }
  }
)
