import React, { Component } from 'react'
import { connect } from 'react-redux'
import { mapStateToProps } from '@/store/'
import PropTypes from 'prop-types'
import { mapActions } from '@/store/'
import Layout from '@/components/core/Layout'
import RiwayatPelatihanTeknisDetailComponent from '@/components/Riwayat/Pelatihan/Teknis/RiwayatPelatihanTeknisDetailComponent'

export default connect(
  mapStateToProps('training'),
  mapActions('getTraining', 'clearTrainingState', 'deleteTraining')
)(
  class RiwayatPelatihanTeknisDetailContainer extends Component {
    static propTypes = {
      traning: PropTypes.object,
      getTraining: PropTypes.func,
      clearTrainingState: PropTypes.func,
      deleteTraining: PropTypes.func
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
          <RiwayatPelatihanTeknisDetailComponent
            onLoading={this.setLoading}
            {...this.state}
            {...this.props}
          />
        </Layout>
      )
    }
  }
)
