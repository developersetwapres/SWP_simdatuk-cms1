/* eslint-disable no-unused-vars */
import React from 'react'
import PropTypes from 'prop-types'
import { Autocomplete, Input } from '@/components/shared'
import { Grid } from '@mui/material'
import DatePickerDay from '@/components/shared/form/DatePickerDay'
import UploadFile from '@/components/shared/form/UploadFile'
import CardAccordion from './CardAccordion'
import HeaderForm from './HeaderForm'

const CompetenceTestForm = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
  setFieldValue,
  formikRef,
  options,
  isExpand
}) => {
  const handleData = (data, type, indexItem) => {
    if (type == 'add') {
      const newData = {
        date: '',
        point: null,
        organizer: '',
        certificate: null,
        type: 2
      }

      const updateData = [...data, newData]
      setFieldValue('competences', updateData, false)
    } else {
      const newData = data.filter((item, index) => index !== indexItem)
      setFieldValue('competences', newData, false)
    }
  }

  const handleDeleteData = (idx) => {
    const error = errors?.competences
    if (error) error.splice(idx, 1)
    handleData(values?.competences, 'delete', idx)
  }

  return (
    <CardAccordion
      footer
      title='Hasil Uji Kompetensi'
      textAdd='Tambah Hasil Uji Kompetensi Baru'
      isExpand={isExpand}
      handleAdd={() => handleData(values?.competences, 'add')}
    >
      <Grid container spacing={3}>
        {values?.competences &&
          values?.competences.map((itm, idx) => (
            <Grid item container xs={12} spacing={3} key={idx}>
              <Grid item xs={12} sx={{ padding: 0, margin: 0 }}>
                <HeaderForm
                  title='Hasil Uji Kompetensi'
                  handleDelete={() => handleDeleteData(idx)}
                />
              </Grid>
              {/* Date */}
              <Grid item xs={6}>
                <DatePickerDay
                  label='Tanggal *'
                  placeholder='dd-mm-yyyy'
                  name={`competences[${idx}].date`}
                  value={itm?.date}
                  error={errors?.competences && errors?.competences[idx]?.date}
                  onChange={(val) => {
                    setFieldValue(`competences[${idx}].date`, val, false)
                    setTimeout(() => {
                      formikRef.current.validateField(
                        `competences[${idx}].date`
                      )
                    }, 1)
                  }}
                />
              </Grid>
              {/* Point */}
              <Grid item xs={6}>
                <Autocomplete
                  options={options?.competences}
                  label='Hasil *'
                  placeholder='Pilih Hasil'
                  name={`competences[${idx}].point`}
                  value={itm?.point}
                  error={errors?.competences && errors?.competences[idx]?.point}
                  onChange={(val) => {
                    setFieldValue(`competences[${idx}].point`, val, false)
                    setTimeout(() => {
                      formikRef.current.validateField(
                        `competences[${idx}].point`
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
                  name={`competences[${idx}].organizer`}
                  value={itm?.organizer}
                  error={
                    errors?.competences && errors?.competences[idx]?.organizer
                  }
                  onChange={(e) => {
                    const val = e?.target?.value
                    setFieldValue(`competences[${idx}].organizer`, val, false)
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
                  name={`competences[${idx}].certificate`}
                  value={itm?.certificate}
                  error={
                    errors?.competences && errors?.competences[idx]?.certificate
                  }
                  onDelete={() => {
                    setFieldValue(
                      `competences[${idx}].certificate`,
                      null,
                      false
                    )
                    setTimeout(() => {
                      formikRef.current.validateField(
                        `competences[${idx}].certificate`
                      )
                    }, 1)
                  }}
                  onChange={(val) => {
                    setFieldValue(`competences[${idx}].certificate`, val, false)
                    setTimeout(() => {
                      formikRef.current.validateField(
                        `competences[${idx}].certificate`
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

CompetenceTestForm.propTypes = {
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
  options: PropTypes.object,
  isExpand: PropTypes.bool
}

export default CompetenceTestForm
