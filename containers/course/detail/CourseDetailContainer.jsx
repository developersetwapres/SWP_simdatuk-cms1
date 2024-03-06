import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { mapActions, mapStateToProps } from '@/store/index'
import { connect } from 'react-redux'
import Layout from '@/components/core/Layout'
import CourseSkeleton from '@/components/course/CourseSkeleton'
import CourseDetailComponent from '@/components/course/detail/CourseDetailComponent'

const CourseDetailContainer = ({
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
  getCommandCategory = () => { },
  deleteCourse = () => { },
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
            <CourseDetailComponent
              command={command}
              course={course}
              deleteCourse={deleteCourse}
              filterCourseCategory={filterCourseCategory}
            />
          )
      }
    </Layout>
  )
}

CourseDetailContainer.propTypes = {
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
  getCommandCategory: PropTypes.func,
  deleteCourse: PropTypes.func,
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
    'getCommandCategory',
    'deleteCourse',
    'filterCourseCategory'
  )
)(CourseDetailContainer)
