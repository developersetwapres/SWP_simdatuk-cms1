import { Grid } from '@mui/material'
import React, { useState } from 'react'
import Layout from './Layout'
import { Button, Form, Icon, Input } from '@/components/shared/'
import { EYE_CLOSE_ICON, EYE_OPEN_ICON } from '@/utils/iconConstant'
import { makeStyles } from '@mui/styles'
import { useForm } from '@/hooks/'
import { primaryButtonStyle } from '@/utils/theme'
import { useDispatch, useSelector } from 'react-redux'
import { UPDATE_PASSWORD_REQUESTED } from '@/store/constants'
import { getStorage } from '@/utils/storage'
const useStyles = makeStyles({
  icon: {
    cursor: 'pointer',
    position: 'absolute',
    top: '41px',
    right: '10px'
  }
})

function ChangePassword() {
  const dispatch = useDispatch()
  const selector = useSelector((state) => state.authentication)
  const user = getStorage('_setneg_user')
  // eslint-disable-next-line no-unused-vars
  const [initialValues, setInitialValues] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const validate = (fieldOfValues = values) => {
    const temp = { ...errors }

    if ('oldPassword' in fieldOfValues)
      temp.oldPassword = fieldOfValues.oldPassword ? '' : 'Password lama tidak boleh kosong'

    if ('newPassword' in fieldOfValues)
      temp.newPassword = fieldOfValues.newPassword ? '' : 'Password baru tidak boleh kosong'

    if ('confirmPassword' in fieldOfValues)
      temp.confirmPassword = fieldOfValues.confirmPassword
        ? (
          values.newPassword === fieldOfValues.confirmPassword
            ? ''
            : 'Password harus sama dengan Password Baru'
        )
        : 'Konfirmasi Password baru tidak boleh kosong'

    setErrors({
      ...temp
    })

    if (fieldOfValues === values)
      return Object.values(temp).every(x => x === '')
  }

  const {
    values,
    setErrors,
    errors,
    handleInputChange
  } = useForm(initialValues, true, validate)

  const classes = useStyles()

  const [oldPassword, setOldPassword] = useState(false)
  const [newPassword, setNewPassword] = useState(false)
  const [confirmNewPassword, setConfirmNewPassword] = useState(false)

  const handleOldPassword = () => {
    setOldPassword(oldPassword => !oldPassword)
  }

  const handleNewPassword = () => {
    setNewPassword(newPassword => !newPassword)
  }

  const handleNewConfirimPassword = () => {
    setConfirmNewPassword(confirm => !confirm)
  }


  const handleSubmit = (e) => {
    e.preventDefault()
    if (validate()) {
      dispatch({
        type: UPDATE_PASSWORD_REQUESTED, payload: {
          name: JSON.parse(user).name,
          password: values.newPassword,
          oldPassword: values.oldPassword
        }
      })
    }
  }

  return (
    <Layout>
      <h3>Ubah Password</h3>
      <Grid
        container
        direction='column'
      >
        <Form onSubmit={handleSubmit}>
          <Grid
            item
            sx={{
              marginBottom: '15px'
            }}
          >
            <div style={{
              position: 'relative'
            }}>
              <Input
                label='Password Lama'
                placeholder='Masukan Password Lama'
                fullWidth
                name='oldPassword'
                value={values.oldPassword}
                error={errors.oldPassword}
                onChange={handleInputChange}
                type={oldPassword ? 'text' : 'password'}
              />
              <Icon
                path={oldPassword ? EYE_OPEN_ICON : EYE_CLOSE_ICON}
                maxWidth={20}
                classes={classes.icon}
                onClick={handleOldPassword}
              />
            </div>
          </Grid>
          <Grid
            item
            sx={{
              marginBottom: '15px'
            }}
          >
            <div style={{
              position: 'relative'
            }}>
              <Input
                label='Password Baru'
                placeholder='Masukan Password Baru'
                fullWidth
                name='newPassword'
                type={newPassword ? 'text' : 'password'}
                value={values.newPassword}
                error={errors.newPassword}
                onChange={handleInputChange}
              />
              <Icon
                path={newPassword ? EYE_OPEN_ICON : EYE_CLOSE_ICON}
                maxWidth={20}
                classes={classes.icon}
                onClick={handleNewPassword}
              />
            </div>
          </Grid>
          <Grid
            item
            sx={{
              marginBottom: '15px'
            }}
          >
            <div style={{
              position: 'relative'
            }}>
              <Input
                label='Konfirmasi Password Baru'
                placeholder='Masukan Konfirmasi Password Baru'
                fullWidth
                name='confirmPassword'
                type={confirmNewPassword ? 'text' : 'password'}
                value={values.confirmPassword}
                error={errors.confirmPassword}
                onChange={handleInputChange}
              />
              <Icon
                path={confirmNewPassword ? EYE_OPEN_ICON : EYE_CLOSE_ICON}
                maxWidth={20}
                classes={classes.icon}
                onClick={handleNewConfirimPassword}
              />
            </div>
          </Grid>
          <Grid
            item
          >
            <Button
              text='Submit'
              type='submit'
              color='warning'
              sx={{
                textTransform: 'none',
                ...primaryButtonStyle
              }}
              isBusy={selector?.isBusy}
              isLoading={selector?.loading}
            />
          </Grid>
        </Form>
      </Grid>
    </Layout>
  )
}


export default ChangePassword