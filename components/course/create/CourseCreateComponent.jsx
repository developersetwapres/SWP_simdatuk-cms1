import React, { useState, useEffect } from 'react'
import CourseCreateFormComponent from './CourseCreateFormComponent'
import CourseCreateToolbar from './CourseCreateToolbar'
import PropTypes from 'prop-types'
import { useForm } from '@/hooks/index'
import { getFileExtension } from '@/utils/index'
import { isValidUrl, notAllowedCharAndWord } from '@/utils/regex'
import { format } from 'date-fns'

function CourseCreateComponent({
  course,
  command,
  postCourse = () => { },
  filterCourseCategory = () => { }
}) {
  // eslint-disable-next-line no-unused-vars
  const [initialValues, setInitialValues] = useState({
    image: [],
    course_name: '',
    coach_name: '',
    provider: '',
    topic: '',
    level: '',
    duration: '',
    type_price: '',
    rating: '',
    link: '',
    price: '',
    code: ''
  })

  const validate = (fieldOfValues = values) => {
    const temp = { ...errors }
    if ('image' in fieldOfValues) {
      const extImage = fieldOfValues.image.name
        ? getFileExtension(fieldOfValues.image.name)
        : ''

      temp.image = fieldOfValues.image.length === 0
        ? 'Foto tidak boleh kosong'
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
      temp.price = values.type_price.id === 2 || values.type_price === 3
        ? (
          fieldOfValues.price
            ? (
              notAllowedCharAndWord(fieldOfValues.price)
                ? ''
                : 'Harga harus berupa angka'
            )
            : 'Harga tidak boleh kosong'
        )
        : ''
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

  const [date, setDate] = useState(null)
  const [category, setCategory] = useState('')
  const [languages, setLanguages] = useState([])
  const [editor, setEditor] = useState('')
  const [status, setStatus] = useState(false)
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
      setLanguages([])
      setCustomError({
        language: 'Bahasa tidak boleh kosong'
      })
    }
  }

  const handleSetStatus = () => {
    setStatus(!status)
  }

  const pullData = (val) => {
    setDate(val)
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

  const handleCategory = (e) => {
    setCategory(e)
    resetField('topic', '')
    setCustomError({
      ...customError,
      category: ''
    })
  }

  // // * Reset Error category
  // useEffect(() => {
  //   if (category !== '') setCustomError({ category: '' })
  // }, [category])


  const handleSubmit = () => {
    if (validate()) {
      const courseDate = new Date(date)
      if (values.type_price.id === 1) {
        if (languages.length > 0 && editor.replace(/<(.|\n)*?>/g, '').trim().length !== 0) {
          const payload = new FormData()
          payload.append('name', values.course_name)
          payload.append('coach', values.coach_name)
          payload.append('duration', values.duration)
          payload.append('provider_id', values.provider.id)
          payload.append('category_id', category.id)
          payload.append('status', status)
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

          postCourse(payload)
        } else {
          setCustomError({
            language: languages.length > 0 ? '' : 'Bahasa tidak boleh kosong'
            // editorError: editor.replace(/<(.|\n)*?>/g, '').trim().length !== 0 ? '' : 'Deskripsi tidak boleh kosong'
          })
        }

      } else if (values.type_price.id === 2) {
        if (languages.length > 0 && editor.replace(/<(.|\n)*?>/g, '').trim().length !== 0) {
          const payload = new FormData()
          payload.append('name', values.course_name)
          payload.append('coach', values.coach_name)
          payload.append('duration', values.duration)
          payload.append('provider_id', values.provider.id)
          payload.append('category_id', category.id)
          payload.append('status', status)
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
          postCourse(payload)
        } else {
          setCustomError({
            language: languages.length > 0 ? '' : 'Bahasa tidak boleh kosong'
          })
        }

      } else if (values.type_price.id === 3) {
        if (languages.length > 0 && editor.replace(/<(.|\n)*?>/g, '').trim().length !== 0) {
          const payload = new FormData()
          payload.append('name', values.course_name)
          payload.append('coach', values.coach_name)
          payload.append('duration', values.duration)
          payload.append('provider_id', values.provider.id)
          payload.append('category_id', category.id)
          payload.append('status', status)
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
          postCourse(payload)
        } else {
          setCustomError({
            language: languages.length > 0 ? '' : 'Bahasa tidak boleh kosong'
          })
        }
      }
    } else {
      if (languages.length === 0 && category === '' && editor.replace(/<(.|\n)*?>/g, '').trim().length === 0) {
        setCustomError({
          language: 'Bahasa tidak boleh kosong',
          category: 'Kategori tidak boleh kosong',
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
      <h3>Tambah Course</h3>
      <CourseCreateFormComponent
        values={values}
        errors={errors}
        handleInputChange={handleInputChange}
        command={command}
        editor={editor}
        setEditor={setEditor}
        handleLanguages={handleLanguages}
        handleSetStatus={handleSetStatus}
        filterCourseCategory={filterCourseCategory}
        course={course}
        pullData={pullData}
        customError={customError}
        handleCategory={handleCategory}
        category={category}
      />
      <CourseCreateToolbar
        handleSubmit={handleSubmit}
        loadingCourse={course}
      />
    </>
  )
}

CourseCreateComponent.propTypes = {
  course: PropTypes.object,
  command: PropTypes.object,
  postCourse: PropTypes.func,
  filterCourseCategory: PropTypes.func
}

export default CourseCreateComponent