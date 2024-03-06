import OrganizerComponent from '@/components/organizer/OrganizerComponent'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { mapStateToProps } from '@/store/'
import PropTypes from 'prop-types'
import { mapActions } from '@/store/'
import Layout from '@/components/core/Layout'

export default connect(
  mapStateToProps('provider'),
  mapActions('getProvider', 'deleteListProvider')
)(
  class OrganizerContainer extends Component {
    static propTypes = {
      organizer: PropTypes.object,
      getProvider: PropTypes.func,
      deleteListProvider: PropTypes.func
    }

    constructor(props) {
      super(props)
      this.state = {
        queries: {
          page: 1,
          limit: 10,
          sortBy: '',
          sortDesc: '',
          search: ''
        },
        willRender: false
      }
      this.fetch = this.fetch.bind(this)
      this.onPaginationChange = this.onPaginationChange.bind(this)
      this.onSearch = this.onSearch.bind(this)
      this.onClearFilter = this.onClearFilter.bind(this)
    }

    fetch(queries) {
      this.props.getProvider(queries)
    }

    onPaginationChange(page) {
      const queries = {
        ...this.state.queries,
        page: page
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

    onClearFilter() {
      const queries = {
        ...this.state.queries,
        search: '',
        page: 1
      }
      this.setState({ queries })
      this.fetch(queries)
    }

    componentDidMount() {
      this.fetch(this.state.queries)
      setTimeout(() => {
        this.setState({
          willRender: true
        })
      }, 5000)
    }

    render() {
      return (
        <Layout
          willRender={this.state.willRender}
        >
          <OrganizerComponent
            {...this.state}
            {...this.props}
            deleteListProvider={this.props.deleteListProvider}
            onPaginationChange={this.onPaginationChange}
            onSearch={this.onSearch}
            onClearFilter={this.onClearFilter}
          />
        </Layout>
      )
    }
  }
)
