/* eslint-disable no-unused-vars */
import React from 'react'
import PropTypes from 'prop-types'
import { Input, TextArea } from '@/components/shared'
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
  isAccordion = true,
  isEdit = false
}) => {
  const handleData = (data, type, indexItem) => {
    if (type == 'add') {
      const newData = {
        description: '',
        ...(isEdit ? { date: '', inputer: '' } : {})
      }
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

  if (!isAccordion) {
    return (
      <Notes
        formikRef={formikRef}
        values={values}
        errors={errors}
        setFieldValue={setFieldValue}
        isEdit={isEdit}
        handleDeleteData={handleDeleteData}
      />
    )
  }

  return (
    <CardAccordion
      footer
      title='Catatan'
      textAdd='Tambah Catatan Baru'
      handleAdd={() => handleData(values?.notes, 'add')}
    >
      <Notes
        formikRef={formikRef}
        values={values}
        errors={errors}
        setFieldValue={setFieldValue}
        isEdit={isEdit}
        handleDeleteData={handleDeleteData}
      />
    </CardAccordion>
  )
}

const Notes = ({
  values,
  errors,
  setFieldValue,
  formikRef,
  isEdit = false,
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
                    formikRef.current.validateField(`notes[${idx}].description`)
                  }, 1)
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
  setFieldValue: PropTypes.func,
  formikRef: PropTypes.any,
  isEdit: PropTypes.bool
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
  isAccordion: PropTypes.bool
}

export default NotesForm
