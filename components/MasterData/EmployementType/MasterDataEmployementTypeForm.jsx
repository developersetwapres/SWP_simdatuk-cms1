/* eslint-disable no-unused-vars */
import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Typography, Checkbox } from '@mui/material'
import FormControlLabel from '@mui/material/FormControlLabel'
import { Form, Input, Autocomplete } from '@/components/shared'

const MasterDataEmployementTypeForm = ({
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
  const checkboxLabel = {
    inputProps: { 'aria-label': 'Tampilkan', label: 'Ya' }
  }

  const handleGetValueAccess = (id) => {
    const filter = values?.permissions.filter((itm) => {
      return itm?.id == id
    })

    return filter.length > 0 ? filter[0] : {}
  }

  return (
    <Form>
      <Grid container spacing={3}>
        {/* Pegawai */}
        <Grid item xs={6}>
          <Autocomplete
            options={['a', 'b']}
            name={`name`}
            placeholder='Pilih Pegawai'
            value={values?.name}
            multiple={false}
            label='Pegawai *'
            error={errors?.name}
            onChange={(val) => {
              setFieldValue('name', val, false)
              setTimeout(() => {
                formikRef.current.validateField('name')
              }, 1)
            }}
          />
        </Grid>
        {/* Pegawai */}
        <Grid item xs={6}>
          <Input
            label='Jenis Pegawai *'
            placeholder='Masukkan Jenis Pegawai'
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
        {/* Permissions */}
        <Grid container item xs={12} spacing={3}>
          {/* Title */}
          <Grid item xs={6} sx={{ marginBottom: '-12px' }}>
            <Typography
              sx={{
                margin: 0,
                fontSize: '14px',
                fontWeight: 500
              }}
            >
              Tampilkan
            </Typography>

            <Grid item xs={6}>
              <FormControlLabel
                label={
                  <Typography sx={{ fontSize: '14px' }}>Ya</Typography>
                }
                disabled={false}
                control={<Checkbox checked={() => {}} />}
                sx={{ height: '34px' }}
                onChange={(e) => {}}
              />
            </Grid>
          </Grid>
          
        </Grid>
      </Grid>
    </Form>
  )
}

MasterDataEmployementTypeForm.propTypes = {
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

export default MasterDataEmployementTypeForm
