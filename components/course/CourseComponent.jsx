import React, { useState } from 'react'
import CourseTableListComponent from './CourseTableListComponent'
import CourseToolbarComponent from './CourseToolbarComponent'
import PropTypes from 'prop-types'
import { useForm } from '@/hooks/index'

function CourseComponent({
  queries,
  course,
  command,
  deleteListCourse = () => { },
  onPaginationChange = () => { },
  onSearch = () => { },
  filterCourseCategory = () => { },
  onProvider = () => { },
  onLevel = () => { },
  onPrice = () => { },
  handleClear = () => { },
  onCategory = () => { },
  onTopic = () => { },
  onDuration = () => { },
  onStatus = () => { },
  onLanguage = () => { }
}) {
  const [selected, setSelected] = useState([])
  const [childSelected, setChildSelected] = useState([])
  // eslint-disable-next-line no-unused-vars
  const [initialValues, setInitialValues] = useState({
    category: '',
    topic: '',
    level: '',
    duration: '',
    price: '',
    status: false,
    priceCourse: '',
    code: ''
  })

  const validate = (fieldOfValues = values) => {
    const temp = { ...errors }

    if ('category' in fieldOfValues)
      temp.category = fieldOfValues.category ? '' : 'Kategori tidak boleh kosong'

    if ('topic' in fieldOfValues)
      temp.topic = fieldOfValues.topic ? '' : 'Topik tidak boleh kosong'

    if ('level' in fieldOfValues)
      temp.level = fieldOfValues.level ? '' : 'Level tidak boleh kosong'

    if ('duration' in fieldOfValues)
      temp.duration = fieldOfValues.duration ? '' : 'Durasi (JP) tidak boleh kosong'

    if ('price' in fieldOfValues)
      temp.price = fieldOfValues.price ? '' : 'Biaya tidak boleh kosong'

    if ('status' in fieldOfValues)
      temp.status = fieldOfValues.status ? true : false

    if ('priceCourse' in fieldOfValues)
      temp.priceCourse = fieldOfValues.price?.id === 1
        ? ''
        : (
          fieldOfValues.price?.id === 2 || fieldOfValues.price?.id === 3 || fieldOfValues.priceCourse ? '' : 'Harga tidak boleh kosong'
        )

    if ('code' in fieldOfValues)
      temp.code = fieldOfValues.price?.id === 1 || fieldOfValues?.price?.id === 2
        ? ''
        : (
          fieldOfValues.price?.id === 3 || fieldOfValues.code ? '' : 'Kode Unik tidak boleh kosong'
        )

    setErrors({
      ...temp
    })

    if (fieldOfValues === values)
      return Object.values(temp).every(x => x === '')
  }

  const {
    values,
    errors,
    resetForm,
    setErrors,
    handleInputChange
  } = useForm(initialValues, true, validate)

  return (
    <>
      <CourseToolbarComponent
        onSearch={onSearch}
        selected={selected}
        childSelected={childSelected}
        command={command}
        values={values}
        errors={errors}
        course={course}
        handleInputChange={handleInputChange}
        filterCourseCategory={filterCourseCategory}
        onProvider={onProvider}
        onLevel={onLevel}
        onPrice={onPrice}
        handleClear={handleClear}
        queries={queries}
        onCategory={onCategory}
        onTopic={onTopic}
        onDuration={onDuration}
        onStatus={onStatus}
        onLanguage={onLanguage}
        resetForm={resetForm}
      />
      <CourseTableListComponent
        items={course?.data}
        pagination={course?.pagination}
        deleteListCourse={deleteListCourse}
        onPaginationChange={onPaginationChange}
        setChildSelected={setChildSelected}
        setSelected={setSelected}
        childSelected={childSelected}
        loading={course?.loading}
        selected={selected}
        resetPagination={queries?.page}
      />
    </>
  )
}

CourseComponent.propTypes = {
  queries: PropTypes.object,
  course: PropTypes.object,
  command: PropTypes.object,
  deleteListCourse: PropTypes.func,
  onPaginationChange: PropTypes.func,
  onSearch: PropTypes.func,
  filterCourseCategory: PropTypes.func,
  onProvider: PropTypes.func,
  onLevel: PropTypes.func,
  onPrice: PropTypes.func,
  handleClear: PropTypes.func,
  onCategory: PropTypes.func,
  onTopic: PropTypes.func,
  onDuration: PropTypes.func,
  onStatus: PropTypes.func,
  onLanguage: PropTypes.func
}

export default CourseComponent