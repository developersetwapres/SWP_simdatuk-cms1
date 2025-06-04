import React, { Component } from 'react'
import { connect } from 'react-redux'
import { mapStateToProps } from '@/store/'
import PropTypes from 'prop-types'
import { mapActions } from '@/store/'
import Layout from '@/components/core/Layout'
import RiwayatPenghargaanAddComponent from '@/components/Riwayat/Penghargaan/RiwayatPenghargaanAddComponent'

export default connect(
  mapStateToProps('recognition', 'employee', 'decree'),
  mapActions(
    'postRecognition',
    'getRecognitionsOptions',
    'getEmployees',
    'getDecrees'
  )
)(
  class RiwayatPenghargaanAddContainer extends Component {
    static propTypes = {
      recognition: PropTypes.object,
      employee: PropTypes.object,
      decree: PropTypes.object,
      postRecognition: PropTypes.func,
      getRecognitionsOptions: PropTypes.func,
      getEmployees: PropTypes.func,
      getDecrees: PropTypes.func
    }

    constructor(props) {
      super(props)
      this.state = {
        queries: {
          page: 1,
          limit: '',
          search: ''
        },
        willRender: false
      }
      this.fetch = this.fetch.bind(this)
      this.setLoading = this.setLoading.bind(this)
    }

    fetch(queries) {
      this.props.getRecognitionsOptions(queries)
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
          <RiwayatPenghargaanAddComponent
            onLoading={this.setLoading}
            {...this.state}
            {...this.props}
          />
        </Layout>
      )
    }
  }
)
