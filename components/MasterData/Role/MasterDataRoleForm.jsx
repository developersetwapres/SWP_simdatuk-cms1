/* eslint-disable no-unused-vars */
import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Typography } from '@mui/material'
import { Form, Input } from '@/components/shared'
import PermissionRoleCheckbox from './PermissionRoleCheckbox'

const MasterDataRoleForm = ({
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
    const filter = values?.permissions?.filter((itm) => {
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
            label='Role Pengguna *'
            placeholder='Masukkan Role Pengguna'
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
          <Grid item xs={12} sx={{ marginBottom: '-12px' }}>
            <Typography
              sx={{
                margin: 0,
                fontSize: '14px',
                fontWeight: 500
              }}
            >
              Hak Akses Menu
            </Typography>
          </Grid>
          {/* Menus */}
          {dataPermissions?.map((item, index) => (
            <Grid item xs={6} key={index}>
              <PermissionRoleCheckbox
                data={item}
                dataFormik={values?.permissions}
                values={handleGetValueAccess(item?.id)}
                handleField={setFieldValue}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Form>
  )
}

MasterDataRoleForm.propTypes = {
  dataPermissions: PropTypes.array,
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

export default MasterDataRoleForm
