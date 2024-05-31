/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable indent */
/* eslint-disable no-unused-vars */
import React, { useEffect, useMemo, useRef, useState } from 'react'
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

const MasterDataRoleEditComponent = ({
  role,
  onLoading = () => {},
  getRole = () => {},
  updateRole = () => {},
  clearRoleState = () => {}
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
    onSubmit: () => {}
  })

  const handleSubmit = async (values) => {
    try {
      await FormSchema.validate(values, { abortEarly: false })

      const dataPermission = values?.permissions
      const valuePermission =
        dataPermission.length > 0
          ? dataPermission.map((itm) => {
              return { id: itm?.id, permitted_actions: itm?.permitted_actions }
            })
          : []

      const payload = {
        id: atob(router?.query?.id),
        data: {
          name: values.roleName,
          permissions: valuePermission
        }
      }

      updateRole(payload)
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
    // Get Detail User
    const id = router?.query?.id
    if (id) getRole(atob(id))

    const clearState = () => {
      clearRoleState()
      if (formikRef.current) {
        formikRef.current.resetForm()
      }
    }

    // Event clear state when url path changes
    router.events.on('routeChangeComplete', clearState)

    return () => {
      router.events.off('routeChangeComplete', clearState)
    }
  }, [router])

  useEffect(() => {
    const dataPermissions = role?.dataPermissions
    const state =
      !role?.loading &&
      dataPermissions.length > 0 &&
      Object.entries(role?.detail).length > 0

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

  useEffect(() => {
    const detail = role?.detail

    if (detail?.permissions) {
      const newPermissions = detail?.permissions.map((itm) => {
        return { id: itm?.id, permitted_actions: itm?.permitted_actions }
      })

      formikRef.current?.setFieldValue('roleName', detail?.name, false)
      formikRef.current?.setFieldValue('permissions', newPermissions, false)
    }
  }, [role?.detail])

  return (
    <Formik
      innerRef={formikRef}
      initialValues={formik.values}
      validationSchema={formik.validationSchema}
      onSubmit={formik.onSubmit}
    >
      {(formikProps) => (
        <LayoutPages
          summary={'Edit Data Pengguna'}
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

MasterDataRoleEditComponent.propTypes = {
  role: PropTypes.object,
  onLoading: PropTypes.func,
  getRole: PropTypes.func,
  updateRole: PropTypes.func,
  clearRoleState: PropTypes.func
}

export default MasterDataRoleEditComponent
