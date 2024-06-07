import React, { Component } from 'react'
import { connect } from 'react-redux'
import { mapStateToProps } from '@/store/'
import PropTypes from 'prop-types'
import { mapActions } from '@/store/'
import Layout from '@/components/core/Layout'
import RiwayatPPKDetailComponent from '@/components/Riwayat/PPK/RiwayatPPKDetailComponent'

export default connect(
  mapStateToProps('performance'),
  mapActions('getPerformance', 'clearPerformanceState')
)(
  class RiwayatPPKDetailContainer extends Component {
    static propTypes = {
      performance: PropTypes.object,
      getPerformance: PropTypes.func,
      clearPerformanceState: PropTypes.func
    }

    constructor(props) {
      super(props)
      this.state = {
        willRender: false
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
          <RiwayatPPKDetailComponent
            onLoading={this.setLoading}
            {...this.state}
            {...this.props}
          />
        </Layout>
      )
    }
  }
)
