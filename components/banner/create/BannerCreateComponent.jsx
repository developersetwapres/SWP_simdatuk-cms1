import React, { useEffect, useState } from 'react'
import BannerCreateFormComponent from './BannerCreateFormComponent'
import BannerCreateToolbarComponent from './BannerCreateToolbarComponent'
import { useForm } from '@/hooks/index'
import { getFileExtension } from '@/utils/'
import PropTypes from 'prop-types'
import { isValidUrl } from '@/utils/regex'

function BannerCreateComponent({
  banner,
  postBanner,
  command
}) {
  // eslint-disable-next-line no-unused-vars
  const [initialValues, setInitialValues] = useState({
    type: '',
    nameBanner: '',
    link: '',
    image: [],
    course_id: ''
  })

  const [active, setActive] = useState(false)

  const handleActive = () => {
    setActive(!active)
  }

  const [editor, setEditor] = useState('')

  const [customError, setCustomError] = useState({
    editorError: ''
  })

  const validate = (fieldOfValues = values) => {
    const temp = { ...errors }

    if ('type' in fieldOfValues)
      temp.type = fieldOfValues.type ? '' : 'Tipe tidak boleh kosong'

    if ('nameBanner' in fieldOfValues)
      temp.nameBanner = fieldOfValues.nameBanner ? '' : 'Nama Banner tidak boleh kosong'

    if ('link' in fieldOfValues)
      temp.link = values.type !== 3
        ? ''
        : (
          values.type === 3 && fieldOfValues.link
            ? (
              isValidUrl(fieldOfValues.link)
                ? ''
                : 'Link harus berupa HTTP atau HTTPS'
            )
            : 'Link tidak boleh kosong'
        )

    if ('image' in fieldOfValues) {
      const extImage = fieldOfValues.image.name
        ? getFileExtension(fieldOfValues.image.name)
        : ''

      temp.image = fieldOfValues.image.length === 0
        ? 'Image tidak boleh kosong'
        : (
          extImage !== 'png' && extImage !== 'jpg'
            ? 'Image harus berupa file gambar dengan format png atau jpg'
            : (
              fieldOfValues.image.size > 2097152
                ? 'Image tidak boleh lebih dari 2mb'
                : ''
            )
        )
    }

    if ('course_id' in fieldOfValues)
      temp.course_id = fieldOfValues.type !== 1
        ? ''
        : (
          fieldOfValues.type === 1 && fieldOfValues.course_id ? '' : 'Course tidak boleh kosong'
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
    handleInputChange
  } = useForm(initialValues, true, validate)

  const handleSubmit = () => {
    if (validate()) {
      if (values.type === 1) {
        const payload = new FormData()
        payload.append('name', values.nameBanner)
        payload.append('type', 0)
        payload.append('photo', values.image)
        payload.append('status', active)
        payload.append('course_id', values.course_id.id)

        postBanner(payload)
      } else if (values.type === 2) {
        if (editor.replace(/<(.|\n)*?>/g, '').trim().length !== 0) {
          const payload = new FormData()
          payload.append('name', values.nameBanner)
          payload.append('type', 1)
          payload.append('photo', values.image)
          payload.append('status', active)
          payload.append('content', editor)

          postBanner(payload)
        } else {
          setCustomError({
            editorError: 'Deskripsi tidak boleh kosong'
          })
        }
      } else if (values.type === 3) {
        const payload = new FormData()
        payload.append('name', values.nameBanner)
        payload.append('type', 2)
        payload.append('photo', values.image)
        // payload.append('position', )
        payload.append('status', active)
        payload.append('external_url', values.link)

        postBanner(payload)
      }
    } else {
      if (values.type === 2) {
        if (editor.replace(/<(.|\n)*?>/g, '').trim().length !== 0) {
          setCustomError({
            editorError: ''
          })
        } else {
          setCustomError({
            editorError: 'Deskripsi tidak boleh kosong'
          })
        }
      }
    }
  }

  useEffect(() => {
    if (editor !== '') {
      setCustomError({ editorError: '' })
    }
  }, [editor])


  return (
    <>
      <h3>Tambah Banner</h3>
      <BannerCreateFormComponent
        values={values}
        errors={errors}
        active={active}
        editor={editor}
        setEditor={setEditor}
        handleActive={handleActive}
        handleInputChange={handleInputChange}
        commandCourses={command?.courses}
        customError={customError}
      />
      <BannerCreateToolbarComponent
        handleSubmit={handleSubmit}
        loading={banner}
      />
    </>
  )
}

BannerCreateComponent.propTypes = {
  banner: PropTypes.object,
  postBanner: PropTypes.func,
  command: PropTypes.object
}

export default BannerCreateComponent