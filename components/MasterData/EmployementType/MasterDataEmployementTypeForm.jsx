/* eslint-disable no-unused-vars */
import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Typography, Checkbox, Box } from '@mui/material'
import FormControlLabel from '@mui/material/FormControlLabel'
import { Form, Input, Autocomplete } from '@/components/shared'

const MasterDataEmployementTypeForm = ({
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
  return (
    <Form>
      <Grid container spacing={3}>
        {/* Pegawai */}
        <Grid item xs={6}>
          <Autocomplete
            options={options?.type}
            name={'type'}
            placeholder='Pilih Pegawai'
            value={values?.type}
            multiple={false}
            label='Pegawai *'
            error={errors?.type}
            onChange={(val) => {
              setFieldValue('type', val, false)
              setTimeout(() => {
                formikRef.current.validateField('type')
              }, 1)
            }}
          />
        </Grid>
        {/* Pegawai */}
        <Grid item xs={6}>
          <Input
            label='Jenis Pegawai *'
            placeholder='Masukkan Jenis Pegawai'
            name='name'
            value={values?.name}
            error={errors?.name}
            onChange={(e) => {
              const val = e?.target?.value
              setFieldValue('name', val, false)
              setTimeout(() => {
                formikRef.current.validateField('name')
              }, 1)
            }}
          />
        </Grid>
        {/* Permissions */}
        <Grid item xs={12} spacing={3}>
          <Box>
            <Typography
              sx={{
                margin: 0,
                fontSize: '14px',
                fontWeight: 500
              }}
            >
              Tampilkan
            </Typography>
            <FormControlLabel
              label={<Typography sx={{ fontSize: '14px' }}>Ya</Typography>}
              disabled={false}
              control={<Checkbox checked={values?.status} />}
              sx={{ height: '34px' }}
              onChange={(e) => {
                const val = e?.target?.checked
                setFieldValue('status', val, false)
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </Form>
  )
}

MasterDataEmployementTypeForm.propTypes = {
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

export default MasterDataEmployementTypeForm
