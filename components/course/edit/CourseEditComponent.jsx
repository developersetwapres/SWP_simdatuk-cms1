import React, { useState, useEffect } from 'react'
import CourseEditFormComponent from './CourseEditFormComponent'
import CourseEditToolbarComponent from './CourseEditToolbarComponent'
import PropTypes from 'prop-types'
import { useForm } from '@/hooks/index'
import { getFileExtension } from '@/utils/index'
import { isValidUrl, notAllowedCharAndWord } from '@/utils/regex'
import { format } from 'date-fns'

function CourseEditComponent({
  course,
  command,
  updateCourse = () => { },
  filterCourseCategory = () => { }
}) {
  const customRating =
  {
    id: course?.detail?.rating.value,
    name: course?.detail?.rating.value?.toString()
  }

  // eslint-disable-next-line no-unused-vars
  const [initialValues, setInitialValues] = useState({
    image: [],
    course_name: course.detail.name === null ? '' : course.detail.name,
    coach_name: course.detail.coach === null ? '' : course.detail.coach,
    provider: course.detail.provider === null ? '' : course.detail.provider,
    // category: course.detail.category === null ? '' : course.detail.category,
    topic: course.detail.topic === null ? '' : course.detail.topic,
    level: course.detail.level === null ? '' : course.detail.level,
    duration: course.detail.duration === 0 ? '0' : course.detail.duration,
    type_price: course.detail.price_name === null ? '' : course.detail.price_name,
    rating: customRating || null,
    link: course.detail.url === null ? '' : course.detail.url,
    price: course.detail.price === null ? '' : course.detail.price,
    code: course.detail.freemium_code === null ? '' : course.detail.freemium_code
  })

  const [editor, setEditor] = useState(course?.detail?.description)
  const [dateDay, setDateDay] = useState(course?.detail?.date_course.value === null ? null : new Date(course?.detail?.date_course?.value))
  // eslint-disable-next-line no-unused-vars
  const [image, setImage] = useState(course?.detail?.photo)
  const [languages, setLanguages] = useState(course?.detail?.language || [])
  const [category, setCategory] = useState(course.detail.category === null ? '' : course.detail.category)

  const validate = (fieldOfValues = values) => {
    const temp = { ...errors }

    if ('image' in fieldOfValues) {
      const extImage = fieldOfValues.image.name
        ? getFileExtension(fieldOfValues.image.name)
        : ''

      temp.image = fieldOfValues.image.length === 0
        ? ''
        : (
          extImage !== 'png' && extImage !== 'jpg'
            ? 'Foto harus berupa file gambar dengan format png atau jpg'
            : (
              fieldOfValues.image.size > 5242880
                ? 'Foto tidak boleh lebih dari 5 MB'
                : ''
            )
        )
    }

    if ('course_name' in fieldOfValues)
      temp.course_name = fieldOfValues.course_name ? '' : 'Nama Course tidak boleh kosong'

    if ('coach_name' in fieldOfValues)
      temp.coach_name = fieldOfValues.coach_name ? '' : 'Nama Pelatih tidak boleh kosong'

    if ('provider' in fieldOfValues)
      temp.provider = fieldOfValues.provider ? '' : 'Penyelenggara tidak boleh kosong'

    if ('category' in fieldOfValues)
      temp.category = fieldOfValues.category ? '' : 'Kategori tidak boleh kosong'

    if ('topic' in fieldOfValues)
      temp.topic = fieldOfValues.topic ? '' : 'Topik tidak boleh kosong'

    if ('level' in fieldOfValues)
      temp.level = fieldOfValues.level ? '' : 'Level tidak boleh kosong'

    if ('duration' in fieldOfValues) {
      temp.duration = fieldOfValues.duration
        ? (
          notAllowedCharAndWord(fieldOfValues.duration)
            ? ''
            : 'Durasi hanya boleh angka'
        )
        : 'Durasi tidak boleh kosong'
    }


    if ('type_price' in fieldOfValues)
      temp.type_price = fieldOfValues.type_price ? '' : 'Biaya tidak boleh kosong'

    if ('rating' in fieldOfValues)
      temp.rating = fieldOfValues.rating ? '' : 'Rating tidak boleh kosong'

    if ('link' in fieldOfValues)
      temp.link = fieldOfValues.link
        ? (
          isValidUrl(fieldOfValues.link)
            ? ''
            : 'Link harus berupa HTTP atau HTTPS'
        )
        : 'Link tidak boleh kosong'

    if ('price' in fieldOfValues) {
      temp.price = values.type_price.id === 2 || values.type_price.id === 3
        ? (
          fieldOfValues.price
            ? (
              notAllowedCharAndWord(fieldOfValues.price)
                ? ''
                : 'Harga harus berupa angka'
            ) : 'Harga tidak boleh kosong'
        ) : ''
    }

    if ('code' in fieldOfValues)
      temp.code = values.type_price.id === 1 || values.type_price.id === 2
        ? ''
        : (
          values.type_price.id === 3 && fieldOfValues.code ? '' : 'Kode Unik tidak boleh kosong'
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
    setErrors,
    // eslint-disable-next-line no-unused-vars
    resetForm,
    resetField,
    handleInputChange
  } = useForm(initialValues, true, validate)

  const [statusCourse, setStatusCourse] = useState(course?.detail?.status)
  const [customError, setCustomError] = useState({
    language: '',
    category: '',
    editorError: ''
    // periodCoupon: ''
  })


  const handleLanguages = (e, val) => {
    if (e.target.value === true) {
      setLanguages(prevState => [...prevState, val])
      setCustomError({
        ...customError,
        language: ''
      })
    } else {
      setLanguages(languages.filter((x) => x.id !== val.id))
      if (languages.length === 1) {
        setCustomError({
          language: 'Bahasa tidak boleh kosong'
        })
      }
    }
  }

  const handleStatusCourse = () => setStatusCourse(!statusCourse)

  const handleCategory = (e) => {
    setCategory(e.target.value)
    resetField('topic', '')
    setCustomError({
      ...customError,
      category: ''
    })
  }

  const handleSubmit = () => {
    if (validate()) {
      const courseDate = new Date(dateDay)
      if (values.type_price.id === 1) {
        if (languages.length > 0 && editor.replace(/<(.|\n)*?>/g, '').trim().length !== 0) {
          const payload = new FormData()
          payload.append('id', course?.detail?.id)
          payload.append('name', values.course_name)
          payload.append('coach', values.coach_name)
          payload.append('duration', values.duration)
          payload.append('provider_id', values.provider.id)
          payload.append('category_id', category.id)
          payload.append('status', statusCourse)
          payload.append('topic_id', values.topic.id)
          payload.append('level_id', values.level.id)
          payload.append('date_course', format(courseDate, 'yyyy-MM-dd HH:mm:ss'))
          payload.append('rating', values.rating.id)
          payload.append('description', editor)
          payload.append('price_id', values.type_price.id)
          payload.append('url', values.link)
          payload.append('photo', values.image)
          languages.map((val, indx) => (
            payload.append(`language_id[${indx}]`, val.id)
          ))

          updateCourse(payload)
        } else {
          setCustomError({
            language: languages.length > 0 ? '' : 'Bahasa tidak boleh kosong'
          })
        }

      } else if (values.type_price.id === 2) {
        if (languages.length > 0 && editor.replace(/<(.|\n)*?>/g, '').trim().length !== 0) {
          const payload = new FormData()
          payload.append('id', course?.detail?.id)
          payload.append('name', values.course_name)
          payload.append('coach', values.coach_name)
          payload.append('duration', values.duration)
          payload.append('provider_id', values.provider.id)
          payload.append('category_id', category.id)
          payload.append('status', statusCourse)
          payload.append('topic_id', values.topic.id)
          payload.append('level_id', values.level.id)
          payload.append('date_course', format(courseDate, 'yyyy-MM-dd HH:mm:ss'))
          payload.append('rating', values.rating.id)
          payload.append('description', editor)
          payload.append('price_id', values.type_price.id)
          payload.append('url', values.link)
          payload.append('photo', values.image)
          languages.map((val, indx) => (
            payload.append(`language_id[${indx}]`, val.id)
          ))
          payload.append('price', values.price)

          updateCourse(payload)
        } else {
          setCustomError({
            language: languages.length > 0 ? '' : 'Bahasa tidak boleh kosong'
          })
        }

      } else if (values.type_price.id === 3) {
        if (languages.length > 0 && editor.replace(/<(.|\n)*?>/g, '').trim().length !== 0) {
          const payload = new FormData()
          payload.append('id', course?.detail?.id)
          payload.append('name', values.course_name)
          payload.append('coach', values.coach_name)
          payload.append('duration', values.duration)
          payload.append('provider_id', values.provider.id)
          payload.append('category_id', category.id)
          payload.append('status', statusCourse)
          payload.append('topic_id', values.topic.id)
          payload.append('level_id', values.level.id)
          payload.append('date_course', format(courseDate, 'yyyy-MM-dd HH:mm:ss'))
          payload.append('rating', values.rating.id)
          payload.append('description', editor)
          payload.append('price_id', values.type_price.id)
          payload.append('url', values.link)
          payload.append('photo', values.image)
          languages.map((val, indx) => (
            payload.append(`language_id[${indx}]`, val.id)
          ))
          payload.append('price', values.price)
          payload.append('freemium_code', values.code)

          updateCourse(payload)
        } else {
          setCustomError({
            language: languages.length > 0 ? '' : 'Bahasa tidak boleh kosong'
          })
        }
      }
    } else {
      if (languages.length === 0 && editor.replace(/<(.|\n)*?>/g, '').trim().length === 0) {
        setCustomError({
          language: 'Bahasa tidak boleh kosong',
          editorError: 'Deskripsi tidak boleh kosong'
        })
      }
    }
  }

  useEffect(() => {
    if (editor.replace(/<(.|\n)*?>/g, '').trim().length !== 0) {
      setCustomError({
        ...customError,
        editorError: ''
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor])

  return (
    <>
      <h3>Edit Course</h3>
      <CourseEditFormComponent
        values={values}
        errors={errors}
        handleInputChange={handleInputChange}
        command={command}
        editor={editor}
        languages={languages}
        setEditor={setEditor}
        image={image}
        dateDay={dateDay}
        setDateDay={setDateDay}
        handleLanguages={handleLanguages}
        filterCourseCategory={filterCourseCategory}
        course={course}
        handleStatusCourse={handleStatusCourse}
        statusCourse={statusCourse}
        customError={customError}
        handleCategory={handleCategory}
        category={category}
      />
      <CourseEditToolbarComponent
        handleSubmit={handleSubmit}
        loadingCourse={course}
      />
    </>
  )
}

CourseEditComponent.propTypes = {
  course: PropTypes.object,
  command: PropTypes.object,
  updateCourse: PropTypes.func,
  filterCourseCategory: PropTypes.func
}

export default CourseEditComponent