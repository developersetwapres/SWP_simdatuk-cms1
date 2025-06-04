import React, { Component } from 'react'
import { connect } from 'react-redux'
import { mapStateToProps } from '@/store/'
import PropTypes from 'prop-types'
import { mapActions } from '@/store/'
import Layout from '@/components/core/Layout'
import RiwayatHukumanDisiplinComponent from '@/components/Riwayat/HukumanDisiplin/RiwayatHukumanDisiplinComponent'

export default connect(
  mapStateToProps('disciplinary'),
  mapActions('getDisciplinaries', 'deleteDisciplinary')
)(
  class RiwayatHukumanDisiplinContainer extends Component {
    static propTypes = {
      disciplinary: PropTypes.object,
      getDisciplinaries: PropTypes.func,
      deleteDisciplinary: PropTypes.func
    }

    constructor(props) {
      super(props)
      this.state = {
        queries: {
          page: 1,
          limit: 10,
          search: ''
        },
        willRender: false
      }
      this.fetch = this.fetch.bind(this)
      this.onPaginationChange = this.onPaginationChange.bind(this)
      this.onRowsPerPageChange = this.onRowsPerPageChange.bind(this)
      this.onSearch = this.onSearch.bind(this)
      this.onClearState = this.onClearState.bind(this)
      this.setLoading = this.setLoading.bind(this)
    }

    fetch(queries) {
      this.props.getDisciplinaries(queries)
    }

    onPaginationChange(page) {
      const queries = {
        ...this.state.queries,
        page
      }
      this.setState({ queries })
      this.fetch(queries)
    }

    onRowsPerPageChange(limit) {
      const queries = {
        ...this.state.queries,
        page: 1,
        limit
      }
      this.setState({ queries })
      this.fetch(queries)
    }

    onSearch(value) {
      const queries = {
        ...this.state.queries,
        search: value || '',
        page: 1
      }
      this.setState({ queries })
      this.fetch(queries)
    }

    onClearState() {
      const queries = {
        ...this.state.queries,
        search: '',
        page: 1
      }
      this.setState({ queries })
      this.fetch(queries)
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
          <RiwayatHukumanDisiplinComponent
            onSearch={this.onSearch}
            onFetch={this.fetch}
            onLoading={this.setLoading}
            onPaginationChange={this.onPaginationChange}
            onRowsPerPageChange={this.onRowsPerPageChange}
            {...this.state}
            {...this.props}
          />
        </Layout>
      )
    }
  }
)
