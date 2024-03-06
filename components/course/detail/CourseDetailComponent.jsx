import React from 'react'
import CourseDetailFormComponent from './CourseDetailFormComponent'
import CourseDetailToolbar from './CourseDetailToolbar'
import PropTypes from 'prop-types'

function CourseDetailComponent({
  course,
  command,
  deleteCourse = () => { },
  filterCourseCategory = () => { }
}) {
  return (
    <>
      <h3>Detail Course</h3>
      <CourseDetailFormComponent
        filterCourse={course?.filterCourse?.topic}
        course={course?.detail}
        command={command}
        filterCourseCategory={filterCourseCategory}
      />
      <CourseDetailToolbar
        courseId={course?.detail?.id}
        deleteCourse={deleteCourse}
      />
    </>
  )
}

CourseDetailComponent.propTypes = {
  course: PropTypes.object,
  command: PropTypes.object,
  deleteCourse: PropTypes.func,
  filterCourseCategory: PropTypes.func
}

export default CourseDetailComponent