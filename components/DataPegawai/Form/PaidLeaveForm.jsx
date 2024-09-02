/* eslint-disable no-unused-vars */
import React from 'react'
import PropTypes from 'prop-types'
import { Autocomplete, Input } from '@/components/shared'
import { Grid } from '@mui/material'
import DatePickerDay from '@/components/shared/form/DatePickerDay'
import UploadFile from '@/components/shared/form/UploadFile'
import CardAccordion from './CardAccordion'
import HeaderForm from './HeaderForm'

function PaidLeaveForm({
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
}) {
  const handleData = (data, type, indexItem) => {
    if (type == 'add') {
      const newData = {
        period: null,
        type: null,
        number: '',
        description: '',
        leaveLetter: null
      }

      const updateData = [...data, newData]
      setFieldValue('leaves', updateData, false)
    } else {
      const newData = data.filter((item, index) => index !== indexItem)
      setFieldValue('leaves', newData, false)
    }
  }

  const handleDeleteData = (idx) => {
    const error = errors?.leaves
    if (error) error.splice(idx, 1)
    handleData(values?.leaves, 'leaves', idx)
  }

  const handleGetError = (value) => {
    if (value?.to) {
      return value?.to
    } else {
      return value
    }
  }

  return (
    <CardAccordion
      footer
      title='Cuti'
      textAdd='Tambah Cuti Baru'
      isExpand={isExpand}
      handleAdd={() => handleData(values?.leaves, 'add')}
    >
      <Grid container spacing={3}>
        {values?.leaves &&
          values?.leaves.map((itm, idx) => (
            <Grid item container xs={12} spacing={3} key={idx}>
              <Grid item xs={12} sx={{ padding: 0, margin: 0 }}>
                <HeaderForm
                  title='Cuti'
                  handleDelete={() => handleDeleteData(idx)}
                />
              </Grid>
              {/* Period */}
              <Grid item xs={6}>
                <DatePickerDay
                  mode='range'
                  name={'dateOfBirth'}
                  label='Periode *'
                  placeholder='dd-mm-yyyy'
                  value={itm?.period}
                  error={
                    errors?.leaves && errors?.leaves[idx]?.period
                      ? handleGetError(errors?.leaves[idx]?.period)
                      : null
                  }
                  onChange={(val) => {
                    setFieldValue(`leaves[${idx}].period`, val, false)
                    setTimeout(() => {
                      formikRef.current.validateField(`leaves[${idx}].period`)
                    }, 1)
                  }}
                />
              </Grid>
              {/* Leave Type */}
              <Grid item xs={6}>
                <Autocomplete
                  options={options?.leaves}
                  label='Jenis Cuti *'
                  placeholder='Pilih Jenis Cuti'
                  name={`leaves[${idx}].type`}
                  value={itm?.type}
                  error={errors?.leaves && errors?.leaves[idx]?.type}
                  onChange={(val) => {
                    setFieldValue(`leaves[${idx}].type`, val, false)
                    setTimeout(() => {
                      formikRef.current.validateField(`leaves[${idx}].type`)
                    }, 1)
                  }}
                />
              </Grid>
              {/* Number */}
              <Grid item xs={6}>
                <Input
                  label='No. Cuti *'
                  placeholder='Masukkan No. Cuti *'
                  name={`leaves[${idx}].number`}
                  value={itm?.number}
                  error={errors?.leaves && errors?.leaves[idx]?.number}
                  onChange={(e) => {
                    const val = e?.target?.value
                    setFieldValue(`leaves[${idx}].number`, val, false)
                    setTimeout(() => {
                      formikRef.current.validateField(`leaves[${idx}].number`)
                    }, 1)
                  }}
                />
              </Grid>
              {/* Description */}
              <Grid item xs={6}>
                <Input
                  label='Keterangan *'
                  placeholder='Masukkan Keterangan *'
                  name={`leaves[${idx}].description`}
                  value={itm?.description}
                  error={errors?.leaves && errors?.leaves[idx]?.description}
                  onChange={(e) => {
                    const val = e?.target?.value
                    setFieldValue(`leaves[${idx}].description`, val, false)
                    setTimeout(() => {
                      formikRef.current.validateField(
                        `leaves[${idx}].description`
                      )
                    }, 1)
                  }}
                />
              </Grid>
              {/* Leave Letter */}
              <Grid item xs={12}>
                <UploadFile
                  label='Surat Cuti'
                  maxSize={2}
                  dataUnit='MB'
                  formatFile={['.png', '.jpg', '.pdf']}
                  name={`leaves[${idx}].leaveLetter`}
                  value={itm?.leaveLetter}
                  error={errors?.leaves && errors?.leaves[idx]?.leaveLetter}
                  onDelete={() => {
                    setFieldValue(`leaves[${idx}].leaveLetter`, null, false)
                    setTimeout(() => {
                      formikRef.current.validateField(
                        `leaves[${idx}].leaveLetter`
                      )
                    }, 1)
                  }}
                  onChange={(val) => {
                    setFieldValue(`leaves[${idx}].leaveLetter`, val, false)
                    setTimeout(() => {
                      formikRef.current.validateField(
                        `leaves[${idx}].leaveLetter`
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

PaidLeaveForm.propTypes = {
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

export default PaidLeaveForm
