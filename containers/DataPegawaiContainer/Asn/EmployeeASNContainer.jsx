import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import EmployeeASNComponent from '@/components/DataPegawai/Asn/EmployeeASNComponent'
import { mapActions, mapStateToProps } from '@/store/index'
import Layout from '@/components/core/Layout'

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
  class EmployeeASNContainer extends Component {
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
          <EmployeeASNComponent {...this.state} {...this.props} />
        </Layout>
      )
    }
  }
)
