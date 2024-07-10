import React, { Component } from 'react'
import { connect } from 'react-redux'
import { mapStateToProps } from '@/store/'
import PropTypes from 'prop-types'
import { mapActions } from '@/store/'
import Layout from '@/components/core/Layout'
import MasterDataPositionComponent from '@/components/MasterData/Position/MasterDataPositionComponent'

export default connect(
  mapStateToProps('position'),
  mapActions('getPositions', 'deletePosition')
)(
  class MasterDataPositionContainer extends Component {
    static propTypes = {
      position: PropTypes.object,
      getPositions: PropTypes.func,
      deletePosition: PropTypes.func
    }

    constructor(props) {
      super(props)
      this.state = {
        queries: {
          page: 1,
          limit: 10,
          search: '',
          filterParent: false,
          parentId: '',
          type: []
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
      this.props.getPositions(queries)
    }

    onPaginationChange(page) {
      const queries = {
        ...this.state.queries,
        page: page
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
          <MasterDataPositionComponent
            onSearch={this.onSearch}
            onLoading={this.setLoading}
            onFetch={this.fetch}
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
