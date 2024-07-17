import React, { Component } from 'react'
import { connect } from 'react-redux'
import { mapStateToProps } from '@/store/'
import PropTypes from 'prop-types'
import { mapActions } from '@/store/'
import Layout from '@/components/core/Layout'
import RiwayatJabatanAddComponent from '@/components/Riwayat/Jabatan/RiwayatJabatanAddComponent'

export default connect(
  mapStateToProps('positionHistories', 'echelon', 'employee'),
  mapActions('postPositionHistories', 'getEchelons', 'getEmployees')
)(
  class RiwayatJabatanAddContainer extends Component {
    static propTypes = {
      positionHistories: PropTypes.object,
      echelon: PropTypes.object,
      employee: PropTypes.object,
      postPositionHistories: PropTypes.func,
      getEchelons: PropTypes.func,
      getEmployees: PropTypes.func
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
          <RiwayatJabatanAddComponent
            onLoading={this.setLoading}
            {...this.state}
            {...this.props}
          />
        </Layout>
      )
    }
  }
)
