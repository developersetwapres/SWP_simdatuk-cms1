import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { mapActions, mapStateToProps } from '@/store/index'
import Layout from '@/components/core/Layout'
import EmployeeAddComponent from '@/components/DataPegawai/Non-Asn/EmployeeAddComponent'

export default connect(
  mapStateToProps(),
  mapActions()
)(
  class EmployeeAddNonASNContainer extends Component {
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
          <EmployeeAddComponent {...this.state} {...this.props} />
        </Layout>
      )
    }
  }
)
