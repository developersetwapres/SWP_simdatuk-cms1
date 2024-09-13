import React, { Component } from 'react'
import { connect } from 'react-redux'
import { mapStateToProps } from '@/store/'
import PropTypes from 'prop-types'
import { mapActions } from '@/store/'
import Layout from '@/components/core/Layout'
import RiwayatPelatihanTeknisAddComponent from '@/components/Riwayat/Pelatihan/Teknis/RiwayatPelatihanTeknisAddComponent'

export default connect(
  mapStateToProps('training', 'employee'),
  mapActions('postTraining', 'getEmployees', 'getClusters')
)(
  class RiwayatPelatihanTeknisAddContainer extends Component {
    static propTypes = {
      training: PropTypes.object,
      employee: PropTypes.object,
      postTraining: PropTypes.func,
      getEmployees: PropTypes.func,
      getClusters: PropTypes.func
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
      this.props.getClusters(queries)
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
          <RiwayatPelatihanTeknisAddComponent
            onLoading={this.setLoading}
            {...this.state}
            {...this.props}
          />
        </Layout>
      )
    }
  }
)
