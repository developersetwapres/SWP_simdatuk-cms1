import React, { Component } from 'react'
import { connect } from 'react-redux'
import { mapStateToProps } from '@/store/'
import PropTypes from 'prop-types'
import { mapActions } from '@/store/'
import Layout from '@/components/core/Layout'
import RiwayatJabatanDetailComponent from '@/components/Riwayat/Jabatan/RiwayatJabatanDetailComponent'

export default connect(
  mapStateToProps('positionHistories', 'echelon'),
  mapActions(
    'getPositionHistories',
    'clearPositionState',
    'getEchelons',
    'deletePositionHistories'
  )
)(
  class RiwayatJabatanDetailContainer extends Component {
    static propTypes = {
      positionHistories: PropTypes.object,
      echelon: PropTypes.object,
      getPositionHistories: PropTypes.func,
      clearPositionState: PropTypes.func,
      getEchelons: PropTypes.func,
      deletePositionHistories: PropTypes.func
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
      this.props.getEchelons(queries)
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
          <RiwayatJabatanDetailComponent
            onLoading={this.setLoading}
            {...this.state}
            {...this.props}
          />
        </Layout>
      )
    }
  }
)
