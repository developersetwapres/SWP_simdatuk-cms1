import CourseComponent from '@/components/course/CourseComponent'
import React, { Component } from 'react'
import { mapActions, mapStateToProps } from '@/store/index'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Layout from '@/components/core/Layout'

export default connect(
  mapStateToProps('course', 'command'),
  mapActions(
    'getCourse',
    'deleteListCourse',
    'getCommandCategory',
    'getCommandTopic',
    'getCourseLevel',
    'getCommandPrice',
    'getCommandCourseDuration',
    'getCommandOrganizer',
    'getCommandCategoryTopic',
    'filterCourseCategory',
    'getCommandLanguage'
  )
)(
  class CourseContainer extends Component {
    static propTypes = {
      course: PropTypes.object,
      command: PropTypes.object,
      getCommandCategory: PropTypes.func,
      getCommandTopic: PropTypes.func,
      getCourseLevel: PropTypes.func,
      getCommandPrice: PropTypes.func,
      getCourse: PropTypes.func,
      deleteListCourse: PropTypes.func,
      getCommandCourseDuration: PropTypes.func,
      getCommandOrganizer: PropTypes.func,
      getCommandCategoryTopic: PropTypes.func,
      filterCourseCategory: PropTypes.func,
      getCommandLanguage: PropTypes.func
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
          provider: '',
          level: '',
          price: '',
          category: '',
          topic: '',
          duration: '',
          status: '',
          language: ''
        },
        willRender: false
      }
      this.fetch = this.fetch.bind(this)
      this.onPaginationChange = this.onPaginationChange.bind(this)
      this.onSearch = this.onSearch.bind(this)
      this.onProvider = this.onProvider.bind(this)
      this.onLevel = this.onLevel.bind(this)
      this.onPrice = this.onPrice.bind(this)
      this.handleClear = this.handleClear.bind(this)
      this.onCategory = this.onCategory.bind(this)
      this.onTopic = this.onTopic.bind(this)
      this.onDuration = this.onDuration.bind(this)
      this.onStatus = this.onStatus.bind(this)
      this.onLanguage = this.onLanguage.bind(this)
    }

    fetch(queries) {
      this.props.getCourse(queries)
    }

    onPaginationChange(page) {
      const queries = {
        ...this.state.queries,
        page: page
      }
      this.setState({ queries })
      this.fetch(queries)
    }

    onProvider(value) {
      const queries = {
        ...this.state.queries,
        provider: value.id || 'empty',
        page: 1
      }
      this.setState({ queries })
      this.fetch(queries)
    }

    onLevel(value) {
      const queries = {
        ...this.state.queries,
        level: value.id || 'empty',
        page: 1
      }
      this.setState({ queries })
      this.fetch(queries)
    }

    onPrice(value) {
      const queries = {
        ...this.state.queries,
        price: value.id || 'empty',
        page: 1
      }
      this.setState({ queries })
      this.fetch(queries)
    }

    onCategory(value) {
      const queries = {
        ...this.state.queries,
        category: value.id || 'empty',
        page: 1
      }
      this.setState({ queries })
      this.fetch(queries)
    }

    onTopic(value) {
      const queries = {
        ...this.state.queries,
        topic: value.id || 'empty',
        page: 1
      }
      this.setState({ queries })
      this.fetch(queries)
    }

    onDuration(value) {
      const queries = {
        ...this.state.queries,
        duration: value.id || 'empty',
        page: 1
      }
      this.setState({ queries })
      this.fetch(queries)
    }

    onStatus(value) {
      const queries = {
        ...this.state.queries,
        status: value.value || 'empty',
        page: 1
      }
      this.setState({ queries })
      this.fetch(queries)
    }

    handleClear() {
      const queries = {
        ...this.state.queries,
        search: '',
        price: '',
        level: '',
        provider: '',
        category: '',
        topic: '',
        duration: '',
        status: '',
        language: '',
        page: 1
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

    onLanguage(value) {
      const queries = {
        ...this.state.queries,
        language: value.id || 'empty',
        page: 1
      }
      this.setState({ queries })
      this.fetch(queries)
    }

    async componentDidMount() {
      await this.fetch(this.state.queries)
      await this.props.getCommandCategory()
      await this.props.getCommandTopic()
      await this.props.getCourseLevel()
      await this.props.getCommandPrice()
      await this.props.getCommandCourseDuration()
      await this.props.getCommandOrganizer()
      await this.props.getCommandCategoryTopic()
      await this.props.getCommandLanguage()
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
          <CourseComponent
            {...this.state}
            {...this.props}
            deleteListCourse={this.props.deleteListCourse}
            onSearch={this.onSearch}
            onPaginationChange={this.onPaginationChange}
            filterCourseCategory={this.props.filterCourseCategory}
            onProvider={this.onProvider}
            onLevel={this.onLevel}
            onPrice={this.onPrice}
            handleClear={this.handleClear}
            onCategory={this.onCategory}
            onTopic={this.onTopic}
            onDuration={this.onDuration}
            onStatus={this.onStatus}
            onLanguage={this.onLanguage}
          />
        </Layout>
      )
    }
  }
)