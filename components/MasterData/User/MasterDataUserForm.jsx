/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Box, Grid, Typography } from '@mui/material'
import { Autocomplete, Button, Form, Input } from '@/components/shared'
import DatepickerYear from '@/components/shared/form/DatepickerYear'
import DatePickerDay from '@/components/shared/form/DatePickerDay'
import { Delete } from '@mui/icons-material'

const MasterDataUserForm = ({
  options,
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
  return (
    <Form>
      <Grid container spacing={3}>
        {/* Username */}
        <Grid item xs={6}>
          <Input
            label='Username *'
            placeholder='Masukkan Username'
            name='username'
            value={values?.username}
            error={errors?.username}
            onChange={(val) => {
              setFieldValue('username', val?.target?.value, false)
              setTimeout(() => {
                formikRef.current.validateField('username')
              }, 1)
            }}
          />
        </Grid>
        {/* Email */}
        <Grid item xs={6}>
          <Input
            label='Email *'
            placeholder='Masukkan Email'
            name='email'
            value={values?.email}
            error={errors?.email}
            onChange={(val) => {
              setFieldValue('email', val?.target?.value, false)
              setTimeout(() => {
                formikRef.current.validateField('email')
              }, 1)
            }}
          />
        </Grid>
        {/* Nama Pegawai */}
        <Grid item xs={6}>
          <Autocomplete
            options={options?.employees}
            name={`name`}
            placeholder='Pilih Nama / NIP'
            value={values?.name}
            multiple={false}
            label='Nama / NIP *'
            error={errors?.name}
            onChange={(val) => {
              setFieldValue('name', val, false)
              setTimeout(() => {
                formikRef.current.validateField('name')
              }, 1)
            }}
          />
        </Grid>
        {/* Role */}
        <Grid item xs={6}>
          <Autocomplete
            options={options?.roles}
            name={`role`}
            placeholder='Pilih Role Pengguna'
            value={values?.role}
            multiple={false}
            label='Role Pengguna *'
            error={errors?.role}
            onChange={(val) => {
              setFieldValue('role', val, false)
              setTimeout(() => {
                formikRef.current.validateField('role')
              }, 1)
            }}
          />
        </Grid>
      </Grid>
    </Form>
  )
}

MasterDataUserForm.propTypes = {
  options: PropTypes.object,
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

export default MasterDataUserForm
