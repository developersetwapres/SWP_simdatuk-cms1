/* eslint-disable no-unused-vars */
import React from 'react'
import PropTypes from 'prop-types'
import { Autocomplete, Input } from '@/components/shared'
import { Grid } from '@mui/material'
import DatePickerDay from '@/components/shared/form/DatePickerDay'
import UploadFile from '@/components/shared/form/UploadFile'
import CardAccordion from './CardAccordion'
import HeaderForm from './HeaderForm'

const AssessmentForm = ({
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
      const newData = {
        date: '',
        point: null,
        organizer: '',
        certificate: null,
        type: 1
      }

      const updateData = [...data, newData]
      setFieldValue('assessments', updateData, false)
    } else {
      const newData = data.filter((item, index) => index !== indexItem)
      setFieldValue('assessments', newData, false)
    }
  }

  const handleDeleteData = (idx) => {
    const error = errors?.assessments
    if (error) error.splice(idx, 1)
    handleData(values?.assessments, 'delete', idx)
  }

  return (
    <CardAccordion
      footer
      title='Hasil Assesment'
      textAdd='Tambah Hasil Assesment Baru'
      handleAdd={() => handleData(values?.assessments, 'add')}
    >
      <Grid container spacing={3}>
        {values?.assessments &&
          values?.assessments.map((itm, idx) => (
            <Grid item container xs={12} spacing={3} key={idx}>
              <Grid item xs={12} sx={{ padding: 0, margin: 0 }}>
                <HeaderForm
                  title='Hasil Assesment'
                  handleDelete={() => handleDeleteData(idx)}
                />
              </Grid>
              {/* Date */}
              <Grid item xs={6}>
                <DatePickerDay
                  label='Tanggal *'
                  placeholder='dd-mm-yyyy'
                  name={`assessments[${idx}].date`}
                  value={itm?.date}
                  error={errors?.assessments && errors?.assessments[idx]?.date}
                  onChange={(val) => {
                    setFieldValue(`assessments[${idx}].date`, val, false)
                    setTimeout(() => {
                      formikRef.current.validateField(
                        `assessments[${idx}].date`
                      )
                    }, 1)
                  }}
                />
              </Grid>
              {/* Point */}
              <Grid item xs={6}>
                <Autocomplete
                  options={options?.assessments}
                  label='Hasil *'
                  placeholder='Pilih Hasil'
                  name={`assessments[${idx}].point`}
                  value={itm?.point}
                  error={errors?.assessments && errors?.assessments[idx]?.point}
                  onChange={(val) => {
                    setFieldValue(`assessments[${idx}].point`, val, false)
                    setTimeout(() => {
                      formikRef.current.validateField(
                        `assessments[${idx}].point`
                      )
                    }, 1)
                  }}
                />
              </Grid>
              {/* Organizer */}
              <Grid item xs={6}>
                <Input
                  label='Penyelenggara'
                  placeholder='Masukkan Penyelenggara'
                  name={`assessments[${idx}].organizer`}
                  value={itm?.organizer}
                  error={
                    errors?.assessments && errors?.assessments[idx]?.organizer
                  }
                  onChange={(e) => {
                    const val = e?.target?.value
                    setFieldValue(`assessments[${idx}].organizer`, val, false)
                  }}
                />
              </Grid>
              {/*  */}
              <Grid item xs={6}>
                <UploadFile
                  label='File Pendukung'
                  maxSize={2}
                  dataUnit='MB'
                  formatFile={['.png', '.jpg', '.pdf']}
                  name={`assessments[${idx}].certificate`}
                  value={itm?.certificate}
                  error={
                    errors?.assessments && errors?.assessments[idx]?.certificate
                  }
                  onDelete={() => {
                    setFieldValue(
                      `assessments[${idx}].certificate`,
                      null,
                      false
                    )
                    setTimeout(() => {
                      formikRef.current.validateField(
                        `assessments[${idx}].certificate`
                      )
                    }, 1)
                  }}
                  onChange={(val) => {
                    setFieldValue(`assessments[${idx}].certificate`, val, false)
                    setTimeout(() => {
                      formikRef.current.validateField(
                        `assessments[${idx}].certificate`
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

AssessmentForm.propTypes = {
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

export default AssessmentForm
