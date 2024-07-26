/* eslint-disable indent */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { Formik, useFormik } from 'formik'
import LayoutPages from '@/components/core/LayoutPages'
import { Box } from '@mui/material'
import Card from '@/components/shared/Card/Index'
import * as Yup from 'yup'
import { Button } from '@/components/shared'
import { useRouter } from 'next/router'
import MasterDataRoleForm from './MasterDataRoleForm'

const FormSchema = Yup.object().shape({
  roleName: Yup.string().required('Role Pengguna tidak boleh kosong')
})

const MasterDataRoleAddComponent = ({
  role,
  onLoading = () => { },
  postRole = () => { }
}) => {
  const router = useRouter()
  const formikRef = useRef(null)

  const [initValue, setInitValue] = useState({
    roleName: '',
    permissions: []
  })

  const formik = useFormik({
    initialValues: initValue,
    validationSchema: FormSchema,
    onSubmit: () => { }
  })

  const handleSubmit = async (values) => {
    try {
      await FormSchema.validate(values, { abortEarly: false })

      const dataPermission = values?.permissions
      const valuePermission =
        dataPermission.length > 0
          ? dataPermission.map((itm) => {
            return { id: itm?.id, permitted_actions: itm?.value }
          })
          : []

      const payload = {
        name: values.roleName,
        permissions: valuePermission
      }

      postRole(payload)
      formikRef.current.setErrors({})
    } catch (err) {
      if (!err.inner || err.inner.length === 0) {
        return
      }

      const newErrors = {}
      err.inner.forEach((error) => {
        newErrors[error.path] = error.message
        formikRef.current.setFieldError(error.path, error.message)
      })

      const firstErrorField = err.inner[0].path
      const firstErrorEl = document.querySelector(`[name="${firstErrorField}"]`)
      firstErrorEl &&
        firstErrorEl.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  useEffect(() => {
    const dataPermissions = role?.dataPermissions
    const state = !role?.loading && dataPermissions.length > 0
    onLoading(state)

    if (dataPermissions.length > 0) {
      const newInitValue = dataPermissions.map((itm, idx) => {
        return {
          id: itm?.id,
          permitted_actions: null
        }
      })

      if (!Object.keys(initValue).includes('permissions'))
        setInitValue({ ...initValue, permissions: newInitValue })
    }
  }, [role])

  return (
    <Formik
      innerRef={formikRef}
      initialValues={formik.values}
      validationSchema={formik.validationSchema}
      onSubmit={formik.onSubmit}
    >
      {(formikProps) => (
        <LayoutPages
          summary={'Tambah Data Role Pengguna'}
          handleBack={() => router.back()}
          action={
            <Box>
              <Button
                text='Simpan'
                onClick={() => handleSubmit(formikProps?.values)}
              />
            </Box>
          }
        >
          <Card>
            <MasterDataRoleForm
              dataPermissions={role?.dataPermissions}
              formikRef={formikRef}
              {...formikProps}
            />
          </Card>
        </LayoutPages>
      )}
    </Formik>
  )
}

MasterDataRoleAddComponent.propTypes = {
  role: PropTypes.object,
  onLoading: PropTypes.func,
  postRole: PropTypes.func
}

export default MasterDataRoleAddComponent
