/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react'
import { Input, Button, Icon, Checkbox, Form } from '@/components/shared/index'
import PropTypes from 'prop-types'
import { EYE_OPEN_ICON, EYE_CLOSE_ICON } from '@/utils/iconConstant'
import { makeStyles } from '@mui/styles'
import { Grid, Stack } from '@mui/material'
import { primaryButtonStyle } from '@/utils/theme'

const useStyles = makeStyles({
  icon: {
    cursor: 'pointer',
    position: 'absolute',
    top: '41px',
    right: '10px'
  },
  MuiCheckbox: {
    '&.root': {
      color: '#fff'
    }
  }
})

function LoginFormComponent({
  values,
  errors,
  stateLoading,
  rememberMe,
  handleInputChange = () => { },
  handleLogin = () => { },
  handleResetEmail = () => { },
  setRememberMe = () => { }
}) {
  const [showPassword, setShowPassword] = useState(false)
  const classes = useStyles()

  const togglePassword = () => {
    setShowPassword(showPassword => !showPassword)
  }


  return (
    <>
      <Grid container direction='column'>
        <Form onSubmit={handleLogin}>
          <Grid item>
            <Input
              label='SSO'
              name='nip'
              placeholder='Masukan SSO Anda'
              value={values.nip}
              onChange={handleInputChange}
              sx={{
                backgroundColor: '#fff',
                borderRadius: '6px',
                border: errors.nip ? '1px solid #d32f2f' : ''
              }}
              fullWidth
            />
            {
              errors.nip && (
                <p style={{
                  color: '#d32f2f',
                  marginTop: '5px'
                }}>{errors.nip}</p>
              )
            }
          </Grid>
          <Grid
            item
          >
            <div style={{
              position: 'relative'
            }}>
              <Input
                label='Password'
                type={showPassword ? 'text' : 'password'}
                name='password'
                value={values.password}
                onChange={handleInputChange}
                placeholder='Masukan Password Anda'
                fullWidth
                sx={{
                  backgroundColor: '#fff',
                  borderRadius: '6px',
                  border: errors.password ? '1px solid #d32f2f' : ''
                }}
              />
              {
                errors.password && (
                  <p style={{
                    color: '#d32f2f',
                    marginTop: '5px'
                  }}>{errors.password}</p>
                )
              }
              <Icon
                path={showPassword ? EYE_OPEN_ICON : EYE_CLOSE_ICON}
                maxWidth={20}
                onClick={togglePassword}
                classes={classes.icon}
              />
            </div>
          </Grid>

          <Stack
            direction={{
              md: 'row',
              sm: 'row',
              xs: 'row'
            }}
            alignItems='center'
            justifyContent='space-between'
          >
            <div>
              <Checkbox
                label='Ingat Saya'
                color='warning'
                sx={{
                  color: '#fff',
                  '.MuiFormControlLabel:': {
                    '&-label': {
                      color: '#fff'
                    }
                  }
                }}
                name='remember'
                value={rememberMe}
                onChange={() => { setRememberMe(!rememberMe) }}
              />
            </div>
            <div>
              <p style={{ cursor: 'pointer' }} onClick={handleResetEmail}>Lupa password</p>
            </div>
          </Stack>
          <Grid
            item
          >
            <Button
              text='Login'
              color='warning'
              sx={{
                ...primaryButtonStyle,
                textTransform: 'none'
              }}
              type='submit'
              fullWidth
              isBusy={stateLoading?.isBusy}
              isLoading={stateLoading?.loading}
            />
          </Grid>
        </Form>
      </Grid>
    </>
  )
}

LoginFormComponent.propTypes = {
  values: PropTypes.object,
  errors: PropTypes.object,
  stateLoading: PropTypes.object,
  handleInputChange: PropTypes.func,
  handleLogin: PropTypes.func,
  rememberMe: PropTypes.bool,
  handleResetEmail: PropTypes.func,
  setRememberMe: PropTypes.func
}

export default LoginFormComponent