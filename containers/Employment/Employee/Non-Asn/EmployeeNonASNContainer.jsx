import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { mapActions, mapStateToProps } from '@/store/index'
import Layout from '@/components/core/Layout'
import EmployeeNonASNComponent from '@/components/Employment/Employee/Non-Asn/EmployeeNonASNComponent'

export default connect(
  mapStateToProps('command', 'authentication'),
  mapActions(
    'getUserMe',
    'getCommandUserPosition',
    'getCommandUserUnit',
    'getCommandUserLevel',
    'updateProfile'
  )
)(
  class EmployeeNonASNContainer extends Component {
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
          <EmployeeNonASNComponent {...this.state} {...this.props} />
        </Layout>
      )
    }
  }
)
