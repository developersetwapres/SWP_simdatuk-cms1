import React, { Component } from 'react'
import { connect } from 'react-redux'
import { mapStateToProps } from '@/store/'
import PropTypes from 'prop-types'
import { mapActions } from '@/store/'
import Layout from '@/components/core/Layout'
import RiwayatPPKEditComponent from '@/components/Riwayat/PPK/RiwayatPPKEditComponent'

export default connect(
  mapStateToProps('performance', 'employee'),
  mapActions(
    'getPerformance',
    'updatePerformance',
    'clearPerformanceState',
    'getEmployees'
  )
)(
  class RiwayatPPKEditContainer extends Component {
    static propTypes = {
      performance: PropTypes.object,
      employees: PropTypes.object,
      getPerformance: PropTypes.func,
      updatePerformance: PropTypes.func,
      clearPerformanceState: PropTypes.func,
      getEmployees: PropTypes.func
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
          <RiwayatPPKEditComponent
            onLoading={this.setLoading}
            {...this.state}
            {...this.props}
          />
        </Layout>
      )
    }
  }
)
