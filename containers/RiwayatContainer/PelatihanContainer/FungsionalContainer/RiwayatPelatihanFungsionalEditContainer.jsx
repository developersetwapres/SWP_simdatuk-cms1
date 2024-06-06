import React, { Component } from 'react'
import { connect } from 'react-redux'
import { mapStateToProps } from '@/store/'
import PropTypes from 'prop-types'
import { mapActions } from '@/store/'
import Layout from '@/components/core/Layout'
import RiwayatPelatihanFungsionalEditComponent from '@/components/Riwayat/Pelatihan/Fungsional/RiwayatPelatihanFungsionalEditComponent'

export default connect(
  mapStateToProps('training', 'employee'),
  mapActions(
    'getTraining',
    'updateTraining',
    'clearTrainingState',
    'getEmployees'
  )
)(
  class RiwayatPelatihanFungsionalEditContainer extends Component {
    static propTypes = {
      traning: PropTypes.object,
      employee: PropTypes.object,
      getTraining: PropTypes.func,
      updateTraining: PropTypes.func,
      clearTrainingState: PropTypes.func,
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
          <RiwayatPelatihanFungsionalEditComponent
            onLoading={this.setLoading}
            {...this.state}
            {...this.props}
          />
        </Layout>
      )
    }
  }
)
