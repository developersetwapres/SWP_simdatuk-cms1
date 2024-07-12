import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { mapActions, mapStateToProps } from '@/store/index'
import Layout from '@/components/core/Layout'
import EmployeeAddBulkComponent from '@/components/DataPegawai/EmployeeAddBulkComponent'

export default connect(
  mapStateToProps('employee'),
  mapActions(
    'downloadTemplate',
    'uploadTemplate',
    'clearTemplate',
    'clearEmployeeState',
  )
)(
  class EmployeeASNContainer extends Component {
    static propTypes = {
      employee: PropTypes.object,
      downloadTemplate: PropTypes.func,
      uploadTemplate: PropTypes.func,
      clearTemplate: PropTypes.func,
      clearEmployeeState: PropTypes.func
    }

    constructor(props) {
      super(props)
      this.state = {
        willRender: true
      }
      this.setLoading = this.setLoading.bind(this)
    }

    componentDidMount() { }

    setLoading(val) {
      this.setState({ willRender: val })
    }

    render() {
      return (
        <Layout willRender={this.state.willRender}>
          <EmployeeAddBulkComponent
            {...this.state}
            {...this.props}
            setLoading={this.setLoading}
          />
        </Layout>
      )
    }
  }
)
