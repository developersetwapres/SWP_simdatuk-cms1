import React, { Component } from 'react'
import { connect } from 'react-redux'
import { mapStateToProps } from '@/store/'
import PropTypes from 'prop-types'
import { mapActions } from '@/store/'
import Layout from '@/components/core/Layout'
import RiwayatPenghargaanEditComponent from '@/components/Riwayat/Penghargaan/RiwayatPenghargaanEditComponent'

export default connect(
  mapStateToProps('recognition', 'employee', 'decree'),
  mapActions(
    'getRecognition',
    'updateRecognition',
    'getEmployees',
    'getDecrees',
    'clearRecognitionState'
  )
)(
  class RiwayatPenghargaanEditContainer extends Component {
    static propTypes = {
      recognition: PropTypes.object,
      employee: PropTypes.object,
      decree: PropTypes.object,
      getRecognition: PropTypes.func,
      updateRecognition: PropTypes.func,
      getEmployees: PropTypes.func,
      getDecrees: PropTypes.func,
      clearRecognitionState: PropTypes.func
    }

    constructor(props) {
      super(props)
      this.state = {
        queries: {
          page: 1,
          limit: 10000,
          search: ''
        },
        willRender: false
      }
      this.fetch = this.fetch.bind(this)
      this.setLoading = this.setLoading.bind(this)
    }

    fetch(queries) {
      this.props.getEmployees(queries)
      this.props.getDecrees(queries)
    }

    setLoading(val) {
      this.setState({
        willRender: val
      })
    }

    componentDidMount() {
      this.fetch(this.state.queries)
    }

    render() {
      return (
        <Layout willRender={this.state.willRender}>
          <RiwayatPenghargaanEditComponent
            onLoading={this.setLoading}
            {...this.state}
            {...this.props}
          />
        </Layout>
      )
    }
  }
)
