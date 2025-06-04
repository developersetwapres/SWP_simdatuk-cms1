import React, { Component } from 'react'
import { connect } from 'react-redux'
import { mapStateToProps } from '@/store/'
import PropTypes from 'prop-types'
import { mapActions } from '@/store/'
import Layout from '@/components/core/Layout'
import RiwayatGolonganEditComponent from '@/components/Riwayat/Golongan/RiwayatGolonganEditComponent'

export default connect(
  mapStateToProps('grade', 'employee'),
  mapActions(
    'getGrade',
    'getGradesOptions',
    'updateGrade',
    'clearGradeState',
    'getEmployees'
  )
)(
  class RiwayatGolonganEditContainer extends Component {
    static propTypes = {
      grade: PropTypes.object,
      getGradesOptions: PropTypes.func,
      getGrade: PropTypes.func,
      updateGrade: PropTypes.func,
      clearGradeState: PropTypes.func,
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
          <RiwayatGolonganEditComponent
            onLoading={this.setLoading}
            {...this.state}
            {...this.props}
          />
        </Layout>
      )
    }
  }
)
