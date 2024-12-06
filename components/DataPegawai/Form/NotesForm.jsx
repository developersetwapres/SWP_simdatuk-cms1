/* eslint-disable no-unused-vars */
/* eslint-disable react/display-name */
import React, { forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { Input, TextArea } from '@/components/shared'
import { Grid } from '@mui/material'
import CardAccordion from './CardAccordion'
import HeaderForm from './HeaderForm'
import * as Yup from 'yup'
import { useFormik } from 'formik'

const InitValue = {
  notes: []
}

const FormSchema = Yup.object().shape({
  // notes: Yup.lazy((notes) => {
  //   if (Array.isArray(notes) && notes.length > 0) {
  //     return Yup.array().of(
  //       Yup.object().shape({
  //         description: Yup.string()
  //           .required('Catatan tidak boleh kosong')
  //           .max(160, 'Catatan tidak boleh lebih dari 160 karakter')
  //       })
  //     )
  //   } else {
  //     return Yup.array()
  //   }
  // })
})

const NotesForm = forwardRef((props, ref) => {
  const { isAccordion = true, isEdit = false, isExpand } = props
  // const formik = props
  const formik = useFormik({
    initialValues: InitValue,
    validationSchema: FormSchema,
    onSubmit: () => {},
    innerRef: ref
  })

  useImperativeHandle(ref, () => ({
    validateForm: async () => {
      try {
        await FormSchema.validate(formik?.values, { abortEarly: false })

        formik.setErrors({})
        ref.current.setErrors({})

        return ref.current
      } catch (err) {
        if (!err.inner || err.inner.length === 0) {
          return
        }

        const newErrors = {}
        err.inner.forEach((error) => {
          newErrors[error.path] = error.message

          formik.setFieldError(error.path, error.message)
          if (ref.current) {
            ref.current.setFieldError(error.path, error.message)
          }
        })

        formik.setErrors(newErrors)
        if (ref.current) ref.current.setErrors(newErrors)

        const firstErrorField = err.inner[0].path
        const firstErrorEl = document.querySelector(
          `[name="${firstErrorField}"]`
        )

        if (firstErrorEl) {
          setTimeout(() => {
            firstErrorEl.scrollIntoView({ behavior: 'smooth', block: 'end' })
          }, 5)
        }

        return ref.current
      }
    },
    ...Object.fromEntries(
      Object.entries(formik)
        .filter((form) => form[0] !== 'validateForm')
        .map((form) => form)
    )
  }))

  const handleData = (data, type, indexItem) => {
    if (type == 'add') {
      const newData = {
        description: '',
        ...(isEdit ? { date: '', inputer: '' } : {})
      }
      const updateData = [...data, newData]
      formik?.setFieldValue('notes', updateData, false)
    } else {
      const newData = data.filter((item, index) => index !== indexItem)
      formik?.setFieldValue('notes', newData, false)
    }
  }

  const handleDeleteData = (idx) => {
    const error = formik?.errors?.notes
    if (error) error.splice(idx, 1)

    handleData(formik?.values?.notes, 'delete', idx)
  }

  if (!isAccordion) {
    return (
      <Notes
        isEdit={isEdit}
        values={formik?.values}
        errors={formik?.errors}
        setFieldValue={formik?.setFieldValue}
        validateField={formik?.validateField}
        handleDeleteData={handleDeleteData}
      />
    )
  }

  return (
    <CardAccordion
      footer
      title='Catatan'
      textAdd='Tambah Catatan Baru'
      isExpand={isExpand}
      handleAdd={() => handleData(formik?.values?.notes, 'add')}
    >
      <Notes
        isEdit={isEdit}
        values={formik?.values}
        errors={formik?.errors}
        setFieldValue={formik?.setFieldValue}
        validateField={formik?.validateField}
        handleDeleteData={handleDeleteData}
      />
    </CardAccordion>
  )
})

const Notes = ({
  values,
  errors,
  isEdit = false,
  setFieldValue = () => {},
  validateField = () => {},
  handleDeleteData = () => {}
}) => {
  return (
    <Grid container spacing={3}>
      {values?.notes &&
        values?.notes.map((itm, idx) => (
          <Grid item container xs={12} spacing={3} key={idx}>
            <Grid item xs={12} sx={{ padding: 0, margin: 0 }}>
              <HeaderForm
                title='Catatan'
                handleDelete={() => handleDeleteData(idx)}
              />
            </Grid>
            {isEdit && itm?.date && itm?.inputer && (
              <Grid item container xs={12} spacing={3}>
                <Grid item xs={6}>
                  <Input
                    disabled
                    label='Tanggal'
                    placeholder='Masukkan Tanggal'
                    name='notes.date'
                    value={itm?.date}
                    onChange={(e) => {
                      const val = e?.target?.value
                      setFieldValue('notes.date', val, false)
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Input
                    disabled
                    label='Inputer'
                    placeholder='Masukkan Inputer'
                    name='notes.inputer'
                    value={itm?.inputer}
                    onChange={(e) => {
                      const val = e?.target?.value
                      setFieldValue('notes.inputer', val, false)
                    }}
                  />
                </Grid>
              </Grid>
            )}
            <Grid item xs={12}>
              <TextArea
                label='Catatan'
                placeholder='Masukkan Catatan'
                rows={3}
                name={`notes[${idx}].description`}
                value={itm?.description}
                error={errors?.notes && errors?.notes[idx]?.description}
                onChange={(e) => {
                  const val = e?.target?.value
                  setFieldValue(`notes[${idx}].description`, val, false)
                  // setTimeout(() => {
                  //   validateField(`notes[${idx}].description`)
                  // }, 1)
                }}
              />
            </Grid>
          </Grid>
        ))}
    </Grid>
  )
}

Notes.propTypes = {
  values: PropTypes.object,
  errors: PropTypes.object,
  isEdit: PropTypes.bool,
  setFieldValue: PropTypes.func,
  validateField: PropTypes.func,
  handleDeleteData: PropTypes.func
}

NotesForm.propTypes = {
  isAccordion: PropTypes.bool,
  isEdit: PropTypes.bool,
  isExpand: PropTypes.bool
}

export default NotesForm
