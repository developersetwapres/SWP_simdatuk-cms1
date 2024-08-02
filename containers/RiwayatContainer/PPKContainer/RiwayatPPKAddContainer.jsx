import React, { Component } from 'react'
import { connect } from 'react-redux'
import { mapStateToProps } from '@/store/'
import PropTypes from 'prop-types'
import { mapActions } from '@/store/'
import Layout from '@/components/core/Layout'
import RiwayatPPKAddComponent from '@/components/Riwayat/PPK/RiwayatPPKAddComponent'

export default connect(
  mapStateToProps('performance', 'employee'),
  mapActions('postPerformance', 'getEmployees')
)(
  class RiwayatPPKAddContainer extends Component {
    static propTypes = {
      performance: PropTypes.object,
      employees: PropTypes.object,
      postPerformance: PropTypes.func,
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
          <RiwayatPPKAddComponent
            onLoading={this.setLoading}
            {...this.state}
            {...this.props}
          />
        </Layout>
      )
    }
  }
)
