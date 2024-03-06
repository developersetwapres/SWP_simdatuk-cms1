import React, { useState } from 'react'
import PropTypes from 'prop-types'
import OrganizerUpdateFormComponent from './OrganizerUpdateFormComponent'
import OrganizerUpdateToolbarComponent from './OrganizerUpdateToolbarComponent'
import { useForm } from '@/hooks/'
import { getFileExtension } from '@/utils/'
import { isValidUrl } from '@/utils/regex'

function OrganizerUpdateComponent({
  provider,
  updateProvider = () => { }
}) {
  // eslint-disable-next-line no-unused-vars
  const [initialValues, setInitialValues] = useState({
    image: [],
    nameOrganizer: provider?.detail?.name,
    url: provider?.detail?.url
  })

  // eslint-disable-next-line no-unused-vars
  const [image, setImage] = useState(provider?.detail?.photo)

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
      const payload = new FormData()
      payload.append('id', provider?.detail?.id)
      payload.append('name', values.nameOrganizer)
      payload.append('photo', values.image)
      payload.append('url', values.url)

      updateProvider(payload)
    }
  }
  return (
    <>
      <h3>Edit Penyelenggara</h3>
      <OrganizerUpdateFormComponent
        values={values}
        errors={errors}
        handleInputChange={handleInputChange}
        image={image}
      />
      <OrganizerUpdateToolbarComponent
        handleSubmit={handleSubmit}
        loadingProvider={provider}
      />
    </>
  )
}

OrganizerUpdateComponent.propTypes = {
  provider: PropTypes.object,
  updateProvider: PropTypes.func
}

export default OrganizerUpdateComponent