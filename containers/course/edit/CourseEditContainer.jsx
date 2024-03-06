import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { mapActions, mapStateToProps } from '@/store/index'
import { connect } from 'react-redux'
import Layout from '@/components/core/Layout'
import CourseSkeleton from '@/components/course/CourseSkeleton'
import CourseEditComponent from '@/components/course/edit/CourseEditComponent'

const CourseEditContainer = ({
  router,
  course,
  command,
  getDetailCourse = () => { },
  getCommandTopic = () => { },
  getCourseLevel = () => { },
  getCourseCategory = () => { },
  getCommandLanguage = () => { },
  getCommandPrice = () => { },
  getCommandOrganizer = () => { },
  updateCourse = () => { },
  getCommandCategory = () => { },
  filterCourseCategory = () => { }
}) => {
  const [willRender, setWillRender] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setWillRender(true)
    }, 5000)
  }, [])

  useEffect(() => {
    if (!router.isReady) return
    getDetailCourse(router.query.id)
  }, [router, getDetailCourse])

  useEffect(() => {
    getCommandTopic()
    getCourseLevel()
    getCourseCategory()
    getCommandLanguage()
    getCommandPrice()
    getCommandOrganizer()
    getCommandCategory()
  }, [getCommandTopic, getCourseLevel, getCourseCategory, getCommandLanguage, getCommandPrice, getCommandOrganizer, getCommandCategory])

  return (
    <Layout
      willRender={willRender}
    >
      {
        willRender === false
          ? (
            <CourseSkeleton />
          ) : (
            <CourseEditComponent
              command={command}
              course={course}
              filterCourseCategory={filterCourseCategory}
              updateCourse={updateCourse}
            />
          )
      }
    </Layout>
  )
}

CourseEditContainer.propTypes = {
  router: PropTypes.object,
  course: PropTypes.object,
  command: PropTypes.object,
  getDetailCourse: PropTypes.func,
  getCommandTopic: PropTypes.func,
  getCourseLevel: PropTypes.func,
  getCourseCategory: PropTypes.func,
  getCommandLanguage: PropTypes.func,
  getCommandPrice: PropTypes.func,
  getCommandOrganizer: PropTypes.func,
  updateCourse: PropTypes.func,
  getCommandCategory: PropTypes.func,
  filterCourseCategory: PropTypes.func
}

export default connect(
  mapStateToProps('course', 'command'),
  mapActions(
    'getDetailCourse',
    'getCommandTopic',
    'getCourseLevel',
    'getCourseCategory',
    'getCommandLanguage',
    'getCommandPrice',
    'getCommandOrganizer',
    'updateCourse',
    'getCommandCategory',
    'filterCourseCategory'
  )
)(CourseEditContainer)
