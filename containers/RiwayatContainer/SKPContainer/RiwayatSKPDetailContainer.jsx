import React, { Component } from 'react'
import { connect } from 'react-redux'
import { mapStateToProps } from '@/store/'
import PropTypes from 'prop-types'
import { mapActions } from '@/store/'
import Layout from '@/components/core/Layout'
import RiwayatSKPDetailComponent from '@/components/Riwayat/SKP/RiwayatSKPDetailComponent'

export default connect(
  mapStateToProps('target'),
  mapActions('getTarget', 'clearTargetState', 'deleteTarget')
)(
  class RiwayatSKPDetailContainer extends Component {
    static propTypes = {
      target: PropTypes.object,
      getTarget: PropTypes.func,
      clearTargetState: PropTypes.func,
      deleteTarget: PropTypes.func
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
          <RiwayatSKPDetailComponent
            onLoading={this.setLoading}
            {...this.state}
            {...this.props}
          />
        </Layout>
      )
    }
  }
)
