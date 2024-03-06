import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Grid } from '@mui/material'
import { Icon, Input, Button, Form } from '@/components/shared'
import { EYE_CLOSE_ICON, EYE_OPEN_ICON } from '@/utils/iconConstant'
import { makeStyles } from '@mui/styles'
import { primaryButtonStyle } from '@/utils/theme'

const useStyles = makeStyles({
  icon: {
    cursor: 'pointer',
    position: 'absolute',
    top: '41px',
    right: '10px'
  }
})

function ResetPasswordForm({
  values,
  errors,
  stateLoading,
  handleInputChange = () => { },
  handleSubmitReset = () => { }
}) {
  const classes = useStyles()

  const [newPassword, setNewPassword] = useState(false)
  const [confirmNewPassword, setConfirmNewPassword] = useState(false)

  const handleShowNewPassword = () => {
    setNewPassword(newPassword => !newPassword)
  }

  const handleShowConfirmNewPassword = () => {
    setConfirmNewPassword(confirmNewPassword => !confirmNewPassword)
  }

  return (

    <Grid
      container
      direction='column'
      sx={{
        marginTop: '20px'
      }}
    >
      <Form>
        <Grid
          item
          sx={{
            marginBottom: '20px'
          }}
        >
          <div style={{ position: 'relative' }}>
            <Input
              label='Password Baru'
              name='newPassword'
              value={values.newPassword}
              type={newPassword ? 'text' : 'password'}
              onChange={handleInputChange}
              fullWidth
              sx={{
                backgroundColor: '#fff',
                borderRadius: '6px'
              }}
            />
            {
              errors?.newPassword && (
                <p style={{
                  color: '#d32f2f',
                  marginTop: '5px'
                }}>{errors.newPassword}</p>
              )
            }
            <Icon
              path={newPassword ? EYE_OPEN_ICON : EYE_CLOSE_ICON}
              maxWidth={20}
              onClick={handleShowNewPassword}
              classes={classes.icon}
            />
          </div>
        </Grid>
        <Grid
          item
          sx={{
            marginBottom: '20px'
          }}
        >
          <div style={{ position: 'relative' }}>
            <Input
              label='Konfirmasi Password'
              name='confirmNewPassword'
              value={values.confirmNewPassword}
              type={confirmNewPassword ? 'text' : 'password'}
              fullWidth
              onChange={handleInputChange}
              sx={{
                backgroundColor: '#fff',
                borderRadius: '6px'
              }}
            />
            {
              errors.confirmNewPassword && (
                <p style={{
                  color: '#d32f2f',
                  marginTop: '5px'
                }}>{errors.confirmNewPassword}</p>
              )
            }
            <Icon
              path={confirmNewPassword ? EYE_OPEN_ICON : EYE_CLOSE_ICON}
              maxWidth={20}
              onClick={handleShowConfirmNewPassword}
              classes={classes.icon}
            />
          </div>
        </Grid>
      </Form>
      <Grid
        item
      >
        <Button
          text='Reset Password'
          sx={{
            textTransform: 'none',
            ...primaryButtonStyle,
            fontWeight: 'bold',
            fontSize: '15px'
          }}
          color='warning'
          fullWidth
          isBusy={stateLoading?.isBusy}
          isLoading={stateLoading?.loading}
          onClick={handleSubmitReset}
        />
      </Grid>
    </Grid>

  )
}

ResetPasswordForm.propTypes = {
  values: PropTypes.object,
  errors: PropTypes.object,
  stateLoading: PropTypes.object,
  handleInputChange: PropTypes.func,
  handleSubmitReset: PropTypes.func
}

export default ResetPasswordForm