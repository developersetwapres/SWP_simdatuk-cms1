import React, { useState } from 'react'
import OrganizerCreateFormComponent from './OrganizerCreateFormComponent'
import OrganizerCreateToolbarComponent from './OrganizerCreateToolbarComponent'
import { useForm } from '@/hooks/'
import { getFileExtension } from '@/utils/'
import PropTypes from 'prop-types'
import { isValidUrl } from '@/utils/regex'

function OrganizerCreateComponent({
  provider,
  postProvider = () => { }
}) {
  // eslint-disable-next-line no-unused-vars
  const [initialValues, setInitialValues] = useState({
    image: [],
    nameOrganizer: '',
    url: ''
  })



  const validate = (fieldOfValues = values) => {
    const temp = { ...errors }

    if ('image' in fieldOfValues) {
      const extImage = fieldOfValues.image.name
        ? getFileExtension(fieldOfValues.image.name)
        : ''

      temp.image = fieldOfValues.image.length === 0
        ? 'Image tidak boleh kosong'
        : (
          extImage !== 'png' && extImage !== 'jpg'
            ? 'Image harus berupa file gambar'
            : (
              fieldOfValues.image.size > 2097152
                ? 'Image tidak boleh dari 2mb'
                : ''
            )
        )
    }

    if ('nameOrganizer' in fieldOfValues)
      temp.nameOrganizer = fieldOfValues.nameOrganizer ? '' : 'Nama Penyelenggara tidak boleh kosong'

    if ('url' in fieldOfValues)
      temp.url = fieldOfValues.url
        ? (
          isValidUrl(fieldOfValues.url)
            ? ''
            : 'Link harus berupa HTTP atau HTTPS'
        ) : 'Link tidak boleh kosong'


    setErrors({
      ...temp
    })

    if (fieldOfValues === values)
      return Object.values(temp).every(x => x === '')
  }

  const {
    values,
    setErrors,
    errors,
    handleInputChange
  } = useForm(initialValues, true, validate)

  const handleSubmit = () => {
    if (validate()) {
      const formData = new FormData()
      formData.append('name', values.nameOrganizer)
      formData.append('photo', values.image)
      formData.append('url', values.url)

      postProvider(formData)
    }
  }
  return (
    <>
      <h3>Tambah Penyelenggara</h3>
      <OrganizerCreateFormComponent
        values={values}
        errors={errors}
        handleInputChange={handleInputChange}
      />
      <OrganizerCreateToolbarComponent
        handleSubmit={handleSubmit}
        loadingProvider={provider}
      />
    </>
  )
}

OrganizerCreateComponent.propTypes = {
  provider: PropTypes.object,
  postProvider: PropTypes.func
}

export default OrganizerCreateComponent