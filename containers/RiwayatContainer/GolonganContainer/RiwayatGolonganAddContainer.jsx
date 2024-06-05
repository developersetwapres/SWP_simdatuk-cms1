import React, { Component } from 'react'
import { connect } from 'react-redux'
import { mapStateToProps } from '@/store/'
import PropTypes from 'prop-types'
import { mapActions } from '@/store/'
import Layout from '@/components/core/Layout'
import RiwayatGolonganAddComponent from '@/components/Riwayat/Golongan/RiwayatGolonganAddComponent'

export default connect(
  mapStateToProps('grade', 'employee'),
  mapActions('getGradesOptions', 'postGrade', 'getEmployees')
)(
  class RiwayatGolonganAddContainer extends Component {
    static propTypes = {
      grade: PropTypes.object,
      getGradesOptions: PropTypes.func,
      postGrade: PropTypes.func,
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
      this.props.getGradesOptions(queries)
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
          <RiwayatGolonganAddComponent
            onLoading={this.setLoading}
            {...this.state}
            {...this.props}
          />
        </Layout>
      )
    }
  }
)
