import React, { useState } from 'react'
import CategoryCreateFormComponent from './CategoryCreateFormComponent'
import CategoryCreateToolbar from './CategoryCreateToolbar'
import { useForm } from '@/hooks/index'
import { getFileExtension } from '@/utils/'
import PropTypes from 'prop-types'

function CategoryCreateComponent({
  category,
  postCategory = () => { }
}) {
  // eslint-disable-next-line no-unused-vars
  const [initialValues, setInitialValues] = useState({
    category: '',
    program: '',
    topic: '',
    image: []
  })

  const [topic, setTopic] = useState([])
  const [customError, setCustomError] = useState({
    topic: ''
  })

  const validate = (fieldOfValues = values) => {
    const temp = { ...errors }

    if ('category' in fieldOfValues)
      temp.category = fieldOfValues.category ? '' : 'Kategori tidak boleh kosong'

    if ('program' in fieldOfValues)
      temp.program = fieldOfValues.program ? '' : 'Program tidak boleh kosong'

    if ('topic' in fieldOfValues)
      temp.topic = fieldOfValues.topic
        ? ''
        : 'Topik tidak boleh kosong'

    if ('image' in fieldOfValues) {
      const exImage = fieldOfValues.image.name
        ? getFileExtension(fieldOfValues.image.name)
        : ''

      temp.image = fieldOfValues.image.length === 0
        ? 'Image tidak boleh kosong'
        : (
          exImage !== 'png' && exImage !== 'jpg'
            ? 'Image harus berupa file gambar png atau jpg'
            : (
              fieldOfValues.image.size > 2097152
                ? 'Image tidak boleh lebih dari 2 MB'
                : ''
            )
        )
    }

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
    handleInputChange
  } = useForm(initialValues, true, validate)



  /**
   * Handle Topic 
   * 
   * @param {*} newTopic 
   */
  const handleTopic = (newTopic) => {
    setTopic([...topic, { text: newTopic, id: Date.now() }])
    setCustomError({ topic: '' })
  }

  /**
   * Handle Delete Topic
   * 
   * @param {*} idTopic 
   */
  const handleDeleteTopic = (idTopic) => {
    setTopic(topic.filter(item => item.id !== idTopic))
  }

  const handleSubmit = () => {
    if (validate() && topic.length > 0) {
      const payload = new FormData()
      payload.append('name', values.category)
      payload.append('photo', values.image)
      payload.append('pkasn_program', values.program.id)
      topic.map((val, index) => (
        payload.append(`topic[${index}]`, val.text)
      ))

      postCategory(payload)
    } else {
      setCustomError({
        topic: 'Topik tidak boleh kosong'
      })
    }
  }

  React.useEffect(() => {
    function watchErrors() {
      if (values.topic !== '') {
        setCustomError({ topic: '' })
      }
    }
    watchErrors()
  }, [values])

  return (
    <>
      <h3>Tambah Kategori</h3>
      <CategoryCreateFormComponent
        values={values}
        errors={errors}
        category={category}
        handleInputChange={handleInputChange}
        handleTopic={handleTopic}
        handleDeleteTopic={handleDeleteTopic}
        topic={topic}
        customError={customError}
      />
      <CategoryCreateToolbar
        handleSubmit={handleSubmit}
      />
    </>
  )
}

CategoryCreateComponent.propTypes = {
  category: PropTypes.object,
  postCategory: PropTypes.func
}

export default CategoryCreateComponent