import React, { Component } from 'react'
import { connect } from 'react-redux'
import { mapStateToProps } from '@/store/'
import PropTypes from 'prop-types'
import { mapActions } from '@/store/'
import Layout from '@/components/core/Layout'
import RiwayatJabatanEditComponent from '@/components/Riwayat/Jabatan/RiwayatJabatanEditComponent'

export default connect(
  mapStateToProps('positionHistories', 'echelon', 'employee'),
  mapActions(
    'getPositionHistories',
    'updatePositionHistories',
    'getEchelons',
    'getEmployees',
    'clearPositionHistoriesState'
  )
)(
  class RiwayatJabatanEditContainer extends Component {
    static propTypes = {
      positionHistories: PropTypes.object,
      echelon: PropTypes.object,
      employee: PropTypes.object,
      getPositionHistories: PropTypes.func,
      getEchelons: PropTypes.func,
      getEmployees: PropTypes.func,
      clearPositionHistoriesState: PropTypes.func
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
      this.props.getEmployees(queries)
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
          <RiwayatJabatanEditComponent
            onLoading={this.setLoading}
            {...this.state}
            {...this.props}
          />
        </Layout>
      )
    }
  }
)
