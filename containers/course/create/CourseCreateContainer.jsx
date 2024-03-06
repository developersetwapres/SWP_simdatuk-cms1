import CourseCreateComponent from '@/components/course/create/CourseCreateComponent'
import React, { Component } from 'react'
import { mapStateToProps, mapActions } from '@/store/'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Layout from '@/components/core/Layout'
import CourseSkeleton from '@/components/course/CourseSkeleton'

export default connect(
  mapStateToProps('course', 'command'),
  mapActions(
    'postCourse',
    'getCommandTopic',
    'getCourseLevel',
    'getCourseCategory',
    'getCommandLanguage',
    'getCommandPrice',
    'getCommandOrganizer',
    'getCommandCategory',
    'filterCourseCategory'
  )
)(

  class CourseCreateContainer extends Component {
    static propTypes = {
      course: PropTypes.object,
      command: PropTypes.object,
      postCourse: PropTypes.func,
      getCommandTopic: PropTypes.func,
      getCourseLevel: PropTypes.func,
      getCourseCategory: PropTypes.func,
      getCommandLanguage: PropTypes.func,
      getCommandPrice: PropTypes.func,
      getCommandOrganizer: PropTypes.func,
      getCommandCategory: PropTypes.func,
      filterCourseCategory: PropTypes.func
    }

    constructor(props) {
      super(props)
      this.state = {
        willRender: false
      }
    }

    async componentDidMount() {
      await this.props.getCommandTopic()
      await this.props.getCourseLevel()
      await this.props.getCourseCategory()
      await this.props.getCommandLanguage()
      await this.props.getCommandPrice()
      await this.props.getCommandOrganizer()
      await this.props.getCommandCategory()
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
          {
            this.state.willRender === false ? (
              <CourseSkeleton />
            ) : (
              <CourseCreateComponent
                {...this.state}
                {...this.props}
                postCourse={this.props.postCourse}
                filterCourseCategory={this.props.filterCourseCategory}
              />
            )
          }
        </Layout>
      )
    }
  }
)