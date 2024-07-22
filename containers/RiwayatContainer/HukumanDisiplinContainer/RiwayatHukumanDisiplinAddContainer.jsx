import React, { Component } from 'react'
import { connect } from 'react-redux'
import { mapStateToProps } from '@/store/'
import PropTypes from 'prop-types'
import { mapActions } from '@/store/'
import Layout from '@/components/core/Layout'
import RiwayatHukumanDisiplinAddComponent from '@/components/Riwayat/HukumanDisiplin/RiwayatHukumanDisiplinAddComponent'

export default connect(
  mapStateToProps('disciplinary', 'employee'),
  mapActions('getDisciplinariesOptions', 'postDisciplinary', 'getEmployees')
)(
  class RiwayatHukumanDisiplinAddContainer extends Component {
    static propTypes = {
      disciplinary: PropTypes.object,
      employees: PropTypes.object,
      getDisciplinariesOptions: PropTypes.func,
      postDisciplinary: PropTypes.func,
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
      this.props.getDisciplinariesOptions(queries)
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
          <RiwayatHukumanDisiplinAddComponent
            onLoading={this.setLoading}
            {...this.state}
            {...this.props}
          />
        </Layout>
      )
    }
  }
)
