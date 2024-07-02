/* eslint-disable no-unused-vars */
import React from 'react'
import PropTypes from 'prop-types'
import { TextArea } from '@/components/shared'
import { Grid } from '@mui/material'
import CardAccordion from './CardAccordion'
import HeaderForm from './HeaderForm'

const NotesForm = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
  setFieldValue,
  formikRef,
  options
}) => {
  const handleData = (data, type, indexItem) => {
    if (type == 'add') {
      const newData = { description: '' }
      const updateData = [...data, newData]
      setFieldValue('notes', updateData, false)
    } else {
      const newData = data.filter((item, index) => index !== indexItem)
      setFieldValue('notes', newData, false)
    }
  }

  const handleDeleteData = (idx) => {
    const error = errors?.notes
    if (error) error.splice(idx, 1)
    handleData(values?.notes, 'delete', idx)
  }

  return (
    <CardAccordion
      footer
      title='Catatan'
      textAdd='Tambah Catatan Baru'
      handleAdd={() => handleData(values?.notes, 'add')}
    >
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
              <Grid item xs={12}>
                <TextArea
                  label='Catatan *'
                  placeholder='Masukkan Catatan'
                  rows={3}
                  name={`notes[${idx}].description`}
                  value={itm?.description}
                  error={errors?.notes && errors?.notes[idx]?.description}
                  onChange={(e) => {
                    const val = e?.target?.value
                    setFieldValue(`notes[${idx}].description`, val, false)
                    setTimeout(() => {
                      formikRef.current.validateField(
                        `notes[${idx}].description`
                      )
                    }, 1)
                  }}
                />
              </Grid>
            </Grid>
          ))}
      </Grid>
    </CardAccordion>
  )
}

NotesForm.propTypes = {
  values: PropTypes.object,
  errors: PropTypes.object,
  touched: PropTypes.object,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  handleSubmit: PropTypes.func,
  handleField: PropTypes.func,
  setFieldValue: PropTypes.func,
  isSubmitting: PropTypes.bool,
  formikRef: PropTypes.any,
  options: PropTypes.object
}

export default NotesForm
