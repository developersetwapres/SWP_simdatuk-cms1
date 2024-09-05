import React, { Component } from 'react'
import { connect } from 'react-redux'
import { mapStateToProps } from '@/store/'
import PropTypes from 'prop-types'
import { mapActions } from '@/store/'
import Layout from '@/components/core/Layout'
import RiwayatPenghargaanDetailComponent from '@/components/Riwayat/Penghargaan/RiwayatPenghargaanDetailComponent'

export default connect(
  mapStateToProps('recognition', 'decree'),
  mapActions('getRecognition', 'clearRecognitionState', 'getDecrees', 'deleteRecognition')
)(
  class RiwayatPenghargaanDetailContainer extends Component {
    static propTypes = {
      recognition: PropTypes.object,
      decree: PropTypes.object,
      getRecognition: PropTypes.func,
      clearRecognitionState: PropTypes.func,
      getDecrees: PropTypes.func,
      deleteRecognition: PropTypes.func
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
          <RiwayatPenghargaanDetailComponent
            onLoading={this.setLoading}
            {...this.state}
            {...this.props}
          />
        </Layout>
      )
    }
  }
)
