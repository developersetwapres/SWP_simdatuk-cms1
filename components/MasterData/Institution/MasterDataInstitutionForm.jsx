/* eslint-disable no-unused-vars */
import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Typography } from '@mui/material'
import { Form, Input } from '@/components/shared'

const MasterDataInstitutionForm = ({
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
        <Grid item xs={12}>
          <Input
            label='Nama Instansi *'
            placeholder='Masukkan Nama Instansi'
            name='name'
            value={values?.name}
            error={errors?.name}
            onChange={(val) => {
              setFieldValue('name', val?.target?.value, false)
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

MasterDataInstitutionForm.propTypes = {
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

export default MasterDataInstitutionForm
