/* eslint-disable no-unused-vars */
import React from 'react'
import PropTypes from 'prop-types'
import { Autocomplete, Input } from '@/components/shared'
import { Grid } from '@mui/material'
import DatePickerDay from '@/components/shared/form/DatePickerDay'
import UploadFile from '@/components/shared/form/UploadFile'
import CardAccordion from './CardAccordion'
import HeaderForm from './HeaderForm'

const TalentPoolForm = ({
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
        type: 3
      }

      const updateData = [...data, newData]
      setFieldValue('talentPools', updateData, false)
    } else {
      const newData = data.filter((item, index) => index !== indexItem)
      setFieldValue('talentPools', newData, false)
    }
  }

  const handleDeleteData = (idx) => {
    const error = errors?.talentPools
    if (error) error.splice(idx, 1)
    handleData(values?.talentPools, 'delete', idx)
  }

  return (
    <CardAccordion
      footer
      title='Hasil Talent Pool'
      textAdd='Tambah Hasil Talent Pool Baru'
      handleAdd={() => handleData(values?.talentPools, 'add')}
    >
      <Grid container spacing={3}>
        {values?.talentPools &&
          values?.talentPools.map((itm, idx) => (
            <Grid item container xs={12} spacing={3} key={idx}>
              <Grid item xs={12} sx={{ padding: 0, margin: 0 }}>
                <HeaderForm
                  title='Hasil Talent Pool'
                  handleDelete={() => handleDeleteData(idx)}
                />
              </Grid>
              {/* Date */}
              <Grid item xs={6}>
                <DatePickerDay
                  label='Tanggal *'
                  placeholder='dd-mm-yyyy'
                  name={`talentPools[${idx}].date`}
                  value={itm?.date}
                  error={errors?.talentPools && errors?.talentPools[idx]?.date}
                  onChange={(val) => {
                    setFieldValue(`talentPools[${idx}].date`, val, false)
                    setTimeout(() => {
                      formikRef.current.validateField(
                        `talentPools[${idx}].date`
                      )
                    }, 1)
                  }}
                />
              </Grid>
              {/* Point */}
              <Grid item xs={6}>
                <Autocomplete
                  options={options?.talentPools}
                  label='Hasil *'
                  placeholder='Pilih Hasil'
                  name={`talentPools[${idx}].point`}
                  value={itm?.point}
                  error={errors?.talentPools && errors?.talentPools[idx]?.point}
                  onChange={(val) => {
                    setFieldValue(`talentPools[${idx}].point`, val, false)
                    setTimeout(() => {
                      formikRef.current.validateField(
                        `talentPools[${idx}].point`
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
                  name={`talentPools[${idx}].organizer`}
                  value={itm?.organizer}
                  error={
                    errors?.talentPools && errors?.talentPools[idx]?.organizer
                  }
                  onChange={(e) => {
                    const val = e?.target?.value
                    setFieldValue(`talentPools[${idx}].organizer`, val, false)
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
                  name={`talentPools[${idx}].certificate`}
                  value={itm?.certificate}
                  error={
                    errors?.talentPools && errors?.talentPools[idx]?.certificate
                  }
                  onDelete={() => {
                    setFieldValue(
                      `talentPools[${idx}].certificate`,
                      null,
                      false
                    )
                    setTimeout(() => {
                      formikRef.current.validateField(
                        `talentPools[${idx}].certificate`
                      )
                    }, 1)
                  }}
                  onChange={(val) => {
                    setFieldValue(`talentPools[${idx}].certificate`, val, false)
                    setTimeout(() => {
                      formikRef.current.validateField(
                        `talentPools[${idx}].certificate`
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

TalentPoolForm.propTypes = {
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

export default TalentPoolForm
