/* eslint-disable no-unused-vars */
import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Typography } from '@mui/material'
import { Form, Input, Autocomplete } from '@/components/shared'

const MasterDataPositionForm = ({
  dataPermissions,
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
  setFieldValue,
  formikRef
}) => {
  const handleGetValueAccess = (id) => {
    const filter = values?.permissions.filter((itm) => {
      return itm?.id == id
    })

    return filter.length > 0 ? filter[0] : {}
  }

  return (
    <Form>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Input
            label='Nama Jabatan *'
            placeholder='Masukkan Jabatan'
            name='roleName'
            value={values?.roleName}
            error={errors?.roleName}
            onChange={(val) => {
              setFieldValue('roleName', val?.target?.value, false)
              setTimeout(() => {
                formikRef.current.validateField('roleName')
              }, 1)
            }}
          />
        </Grid>

        <Grid item xs={6}>
          <Input
            label='Jumlah yang diperlukan *'
            placeholder='0'
            name='roleName'
            value={values?.roleName}
            error={errors?.roleName}
            onChange={(val) => {
              setFieldValue('roleName', val?.target?.value, false)
              setTimeout(() => {
                formikRef.current.validateField('roleName')
              }, 1)
            }}
          />
        </Grid>

        <Grid item xs={6}>
          <Autocomplete
            options={['E', 'A']}
            name={`name`}
            placeholder='Pilih Eselon'
            value={values?.name}
            multiple={false}
            label='Eselon'
            error={errors?.name}
            onChange={(val) => {
              setFieldValue('name', val, false)
              setTimeout(() => {
                formikRef.current.validateField('name')
              }, 1)
            }}
          />
        </Grid>

        <Grid item xs={6}>
          <Autocomplete
            options={['E', 'A']}
            name={`name`}
            placeholder='Pilih Deputi'
            value={values?.name}
            multiple={false}
            label='Deputi'
            error={errors?.name}
            onChange={(val) => {
              setFieldValue('name', val, false)
              setTimeout(() => {
                formikRef.current.validateField('name')
              }, 1)
            }}
          />
        </Grid>
      </Grid>
    </Form>
  )
}

MasterDataPositionForm.propTypes = {
  dataPermissions: PropTypes.object,
  values: PropTypes.object,
  errors: PropTypes.object,
  touched: PropTypes.object,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  handleSubmit: PropTypes.func,
  handleField: PropTypes.func,
  setFieldValue: PropTypes.func,
  isSubmitting: PropTypes.bool,
  formikRef: PropTypes.any
}

export default MasterDataPositionForm
