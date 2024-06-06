/* eslint-disable no-unused-vars */
import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Typography } from '@mui/material'
import { Form, Input } from '@/components/shared'

const MasterDataInstitutionForm = ({
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
        {/* Name */}
        <Grid item xs={12}>
          <Input
            label='Nama Instansi *'
            placeholder='Masukkan Nama Instansi'
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
