import React, { Component } from 'react'
import { connect } from 'react-redux'
import { mapStateToProps } from '@/store/'
import PropTypes from 'prop-types'
import { mapActions } from '@/store/'
import Layout from '@/components/core/Layout'
import DashboardComponent from '@/components/Dashboard/DashboardComponent'

export default connect(
  mapStateToProps('banner'),
  mapActions('getBanners', 'deleteListBanner')
)(
  class DashboardContainer extends Component {
    static propTypes = {
      banner: PropTypes.object,
      getBanners: PropTypes.func,
      deleteListBanner: PropTypes.func
    }

    constructor(props) {
      super(props)
      this.state = {
        queries: {
          page: 1,
          limit: 10,
          sortBy: '',
          sortDesc: '',
          search: '',
          status: '',
          type: ''
        },
        willRender: false
      }
      this.fetch = this.fetch.bind(this)
      this.onPaginationChange = this.onPaginationChange.bind(this)
      this.onSearch = this.onSearch.bind(this)
      this.onStatus = this.onStatus.bind(this)
      this.onType = this.onType.bind(this)
      this.onClearFilter = this.onClearFilter.bind(this)
    }

    fetch(queries) {
      this.props.getBanners(queries)
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

    onStatus(value) {
      const queries = {
        ...this.state.queries,
        status: value.status || false,
        page: 1
      }
      this.setState({ queries })
      this.fetch(queries)
    }

    onType(value) {
      const queries = {
        ...this.state.queries,
        type: value?.value || 0,
        page: 1
      }
      this.setState({ queries })
      this.fetch(queries)
    }

    onClearFilter() {
      const queries = {
        ...this.state.queries,
        search: '',
        type: '',
        status: '',
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
      }, 3000)
    }

    render() {
      return (
        <Layout
          willRender={this.state.willRender}
        >
          <DashboardComponent
            {...this.state}
            {...this.props}
            deleteListBanner={this.props.deleteListBanner}
            onPaginationChange={this.onPaginationChange}
            onSearch={this.onSearch}
            onStatus={this.onStatus}
            onType={this.onType}
            onClearFilter={this.onClearFilter}
          />
        </Layout>
      )
    }
  }
)