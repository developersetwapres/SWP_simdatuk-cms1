import React, { Component } from 'react'
import CategoryComponent from '@/components/category/CategoryComponent'
import { connect } from 'react-redux'
import { mapStateToProps } from '@/store/'
import PropTypes from 'prop-types'
import { mapActions } from '@/store/'
import Layout from '@/components/core/Layout'

export default connect(
  mapStateToProps('category'),
  mapActions('getCourseCategory', 'deleteCourseCategoryList')
)(
  class CategoryContainer extends Component {
    static propTypes = {
      category: PropTypes.object,
      getCourseCategory: PropTypes.func,
      deleteCourseCategoryList: PropTypes.func
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
      this.onClearState = this.onClearState.bind(this)
    }

    fetch(queries) {
      this.props.getCourseCategory(queries)
    }

    onPaginationChange(page) {
      const queries = {
        ...this.state.queries,
        page: page
      }
      this.setState({ queries })
      this.fetch(queries)
    }

    onSearch(val) {
      const queries = {
        ...this.state.queries,
        search: val || '',
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
          <CategoryComponent
            {...this.state}
            {...this.props}
            onPaginationChange={this.onPaginationChange}
            deleteCourseCategoryList={this.props.deleteCourseCategoryList}
            onSearch={this.onSearch}
            onClearState={this.onClearState}
          />
        </Layout>
      )
    }
  }
)