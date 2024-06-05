import React, { Component } from 'react'
import { connect } from 'react-redux'
import { mapStateToProps } from '@/store/'
import PropTypes from 'prop-types'
import { mapActions } from '@/store/'
import Layout from '@/components/core/Layout'
import RiwayatJabatanEditComponent from '@/components/Riwayat/Jabatan/RiwayatJabatanEditComponent'

export default connect(
  mapStateToProps('position', 'echelon', 'employee'),
  mapActions(
    'getPosition',
    'updatePosition',
    'getEchelons',
    'getEmployees',
    'clearPositionState'
  )
)(
  class RiwayatJabatanEditContainer extends Component {
    static propTypes = {
      position: PropTypes.object,
      echelon: PropTypes.object,
      employee: PropTypes.object,
      getPosition: PropTypes.func,
      getEchelons: PropTypes.func,
      getEmployees: PropTypes.func,
      clearPositionState: PropTypes.func
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
