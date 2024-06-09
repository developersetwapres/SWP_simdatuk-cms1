import React, { Component } from 'react'
import { connect } from 'react-redux'
import { mapStateToProps } from '@/store/'
import PropTypes from 'prop-types'
import { mapActions } from '@/store/'
import Layout from '@/components/core/Layout'
import RiwayatHukumanDisiplinEditComponent from '@/components/Riwayat/HukumanDisiplin/RiwayatHukumanDisiplinEditComponent'

export default connect(
  mapStateToProps('disciplinary', 'employee'),
  mapActions(
    'getDisciplinary',
    'updateDisciplinary',
    'getDisciplinariesOptions',
    'clearDisciplinaryState',
    'getEmployees'
  )
)(
  class RiwayatHukumanDisiplinEditContainer extends Component {
    static propTypes = {
      disciplinary: PropTypes.object,
      employees: PropTypes.object,
      getDisciplinary: PropTypes.func,
      updateDisciplinary: PropTypes.func,
      getDisciplinariesOptions: PropTypes.func,
      clearDisciplinaryState: PropTypes.func,
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
      this.props.getDisciplinariesOptions()
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
          <RiwayatHukumanDisiplinEditComponent
            onLoading={this.setLoading}
            {...this.state}
            {...this.props}
          />
        </Layout>
      )
    }
  }
)
