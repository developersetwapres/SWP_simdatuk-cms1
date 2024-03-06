import React, { useState, useEffect } from 'react'
import BannerUpdateFormComponent from './BannerUpdateFormComponent'
import BannerUpdateToolbar from './BannerUpdateToolbar'
import PropTypes from 'prop-types'
import { useForm } from '@/hooks/'
import { getFileExtension } from '@/utils/'
import { isValidUrl } from '@/utils/regex'

function BannerUpdateComponent({
  banner,
  command,
  updateBanner = () => { }
}) {
  // eslint-disable-next-line no-unused-vars
  const [initialValues, setInitialValues] = useState({
    nameBanner: banner?.detail?.name,
    image: [],
    type: banner?.detail?.type === 0 ? 1 : banner?.detail?.type === 1 ? 2 : 3,
    link: banner?.detail?.external_url,
    course: banner?.detail?.course
  })


  const [status, setStatus] = useState(banner?.detail?.status)

  const [editor, setEditor] = useState(banner?.detail?.content)

  const [customError, setCustomError] = useState({
    editorError: ''
  })

  // eslint-disable-next-line no-unused-vars
  const [imageBanner, setImageBanner] = useState(banner?.detail?.photo)


  const validate = (fieldOfValues = values) => {
    const temp = { ...errors }

    if ('nameBanner' in fieldOfValues)
      temp.nameBanner = fieldOfValues.nameBanner ? '' : 'Nama Banner tidak boleh kosong'

    if ('image' in fieldOfValues) {
      const extImage = fieldOfValues.image.name
        ? getFileExtension(fieldOfValues.image.name)
        : ''

      temp.image = fieldOfValues.image.length === 0
        ? ''
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

    if ('type' in fieldOfValues)
      temp.type = fieldOfValues.type ? '' : 'Tipe tidak boleh kosong'

    if ('link' in fieldOfValues)
      temp.link = values.type !== 3
        ? ''
        : (
          values.type === 3 && fieldOfValues.link
            ? (
              isValidUrl(fieldOfValues.link)
                ? ''
                : 'Link harus berupa HTTP atau HTTPS'
            ) : 'Link tidak boleh kosong')


    if ('course' in fieldOfValues)
      temp.course = fieldOfValues.type !== 1
        ? ''
        : (
          fieldOfValues.type === 1 && fieldOfValues.course ? '' : 'Course tidak boleh kosong'
        )

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
    // resetForm,
    handleInputChange
  } = useForm(initialValues, true, validate)

  const handleStatus = () => {
    setStatus(status => !status)
  }

  const handleSubmit = () => {
    if (validate()) {
      if (values.type === 1) {
        const payload = new FormData()
        payload.append('id', banner?.detail?.id)
        payload.append('name', values.nameBanner)
        payload.append('type', 0)
        payload.append('status', status)
        if (values.image.length !== 0) {
          payload.append('photo', values.image)
        }
        payload.append('course_id', values.course.id)

        updateBanner(payload)
        // resetForm()
        // setInitialValues({
        //   nameBanner: '',
        //   image: [],
        //   type: '',
        //   link: '',
        //   course: ''
        // })
      } if (values.type === 2) {
        if (editor.replace(/<(.|\n)*?>/g, '').trim().length !== 0) {
          const payload = new FormData()
          payload.append('id', banner?.detail?.id)
          payload.append('name', values.nameBanner)
          payload.append('type', 1)
          if (values.image.length !== 0) {
            payload.append('photo', values.image)
          }
          payload.append('status', status)
          payload.append('content', editor)

          updateBanner(payload)
        }
      } else if (values.type === 3) {
        const payload = new FormData()
        payload.append('id', banner?.detail?.id)
        payload.append('name', values.nameBanner)
        payload.append('type', 2)
        // payload.append('position', 1)
        if (values.image.length !== 0) {
          payload.append('photo', values.image)
        }
        payload.append('status', status)
        payload.append('external_url', values.link)

        updateBanner(payload)
      }
    } else {
      if (values.type === 2) {
        if (editor !== '') {
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
    if (values.type === 2) {
      if (editor !== '') {
        setCustomError({ editorError: '' })
      }
    }
  }, [values, editor])

  return (
    <>
      <h3>Edit Banner</h3>
      <BannerUpdateFormComponent
        values={values}
        errors={errors}
        status={status}
        editor={editor}
        setEditor={setEditor}
        commandCourse={command?.courses}
        handleInputChange={handleInputChange}
        handleStatus={handleStatus}
        imageBanner={imageBanner}
        customError={customError}
      />
      <BannerUpdateToolbar
        handleSubmit={handleSubmit}
        bannerLoading={banner}
      />
    </>
  )
}

BannerUpdateComponent.propTypes = {
  banner: PropTypes.object,
  command: PropTypes.object,
  updateBanner: PropTypes.func
}

export default BannerUpdateComponent