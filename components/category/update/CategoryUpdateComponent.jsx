/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import CategoryUpdateFormComponent from './CategoryUpdateFormComponent'
import CategoryUpdateToolbar from './CategoryUpdateToolbar'
import { useForm } from '@/hooks/index'
import PropTypes from 'prop-types'
import { getFileExtension } from '@/utils/index'

function CategoryUpdateComponent({
  category,
  updateCourseCategory = () => { }
}) {

  const [initialValues, setInitialValues] = useState({
    category: category?.detail?.name ?? '',
    program: category?.detail?.pkasn_program ?? '',
    topic: '',
    photo: []
  })


  const [image, setImage] = useState(category?.detail?.photo || '')
  const [topic, setTopic] = useState(category?.detail?.topic || [])
  // const [customError, setCustomError] = useState({
  //   topic: ''
  // })

  const validate = (fieldOfValues = values) => {
    const temp = { ...errors }

    if ('category' in fieldOfValues)
      temp.category = fieldOfValues.category ? '' : 'Kategori tidak boleh kosong'

    if ('program' in fieldOfValues)
      temp.program = fieldOfValues.program ? '' : 'Program tidak boleh kosong'

    if ('topic' in fieldOfValues)
      temp.topic = fieldOfValues.topic ? '' : ''

    if ('photo' in fieldOfValues) {
      const extPhoto = fieldOfValues.photo.name
        ? getFileExtension(fieldOfValues.photo.name)
        : ''

      temp.photo = fieldOfValues.photo.length === 0
        ? ''
        : (
          extPhoto !== 'png' && extPhoto !== 'jpg'
            ? 'Image harus berupa file gambar dengan format png atau jpg'
            : (
              fieldOfValues.photo.size > 2097152
                ? 'Image tidak boleh lebih dari 2 MB'
                : ''
            )
        )
      // temp.photo = fieldOfValues.photo.length
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
   * Handle Add Topic 
   * 
   * @param {*} newTopic
   */
  const handleTopic = (newTopic) => {
    setTopic([...topic, { name: newTopic, id: Date.now() }])
  }

  /**
   * Handle delete topic 
   * 
   * @param {*} idTopic 
   */
  const handleDeleteTopic = (idTopic) => {
    setTopic(topic.filter(item => item.id !== idTopic))
  }


  const handleSubmit = () => {
    if (validate()) {
      const payload = new FormData()
      payload.append('id', category?.detail?.id)
      payload.append('name', values.category)
      if (values.photo.length !== 0) {
        payload.append('photo', values.photo)
      }
      payload.append('pkasn_program', values.program.id)
      if (topic?.length > 0) {
        topic.map((val, i) => (
          payload.append(`topic[${i}]`, val.name)
        ))
      }
      updateCourseCategory(payload)
    }
  }


  return (
    <>
      <h3>Edit Kategori</h3>
      <CategoryUpdateFormComponent
        category={category}
        values={values}
        errors={errors}
        handleInputChange={handleInputChange}
        handleTopic={handleTopic}
        handleDeleteTopic={handleDeleteTopic}
        image={image}
        topic={topic}
      />
      <CategoryUpdateToolbar
        handleSubmit={handleSubmit}
      />
    </>
  )
}

CategoryUpdateComponent.propTypes = {
  category: PropTypes.object,
  updateCourseCategory: PropTypes.func
}

export default CategoryUpdateComponent