/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react'
import { Input, Button, Icon, Form } from '@/components/shared/index'
import PropTypes from 'prop-types'
import { EYE_OPEN_ICON, EYE_CLOSE_ICON } from '@/utils/iconConstant'
import { makeStyles } from '@mui/styles'
import { Grid, Stack, Typography } from '@mui/material'
import { primaryButtonStyle } from '@/utils/theme'

const useStyles = makeStyles({
  icon: {
    cursor: 'pointer',
    position: 'absolute',
    top: '70%',
    right: '1%',
    transform: 'translate(-50%, -50%)'

  },
  MuiCheckbox: {
    '&.root': {
      color: '#fff'
    }
  },
  fontBold: {
    fontWeight: '600',
    padding: '0',
    margin: '0'
  }
})

function LoginFormComponent({
  values,
  errors,
  stateLoading,
  handleInputChange = () => { },
  handleLogin = () => { },
  handleResetEmail = () => { }
}) {
  const [showPassword, setShowPassword] = useState(false)
  const classes = useStyles()

  const togglePassword = () => {
    setShowPassword(showPassword => !showPassword)
  }


  return (
    <>
      <Grid
        container
        direction='column'
        sx={{
          bgcolor: '#fff',
          p: 3,
          borderRadius: 2,
          position: 'relative',
          width: {
            xs: '100%',
            lg: '400px',
            xl: '400px'
          }
        }}>
        <Typography
          variant='h6'
          component='h6'
          color='simdatukPrimary.main'
          fontWeight='700'
          pb={3}
        >
          Login
        </Typography>
        <Form onSubmit={handleLogin}>
          <Stack
            spacing={2}
          >
            <Grid item>
              <Input
                classesLabel={classes.fontBold}
                label='Username'
                name='username'
                placeholder='Masukan Username'
                value={values.username}
                onChange={handleInputChange}
                sx={{
                  backgroundColor: '#fff',
                  borderRadius: '6px',
                  border: errors.username ? '1px solid #d32f2f' : ''
                }}
                fullWidth
              />
              {
                errors.username && (
                  <p style={{
                    position: 'absolute',
                    color: '#d32f2f',
                    marginTop: '0',
                    fontSize: '12px'
                  }}>{errors.username}</p>
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
                  classesLabel={classes.fontBold}
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
                    border: errors.username ? '1px solid #d32f2f' : ''
                  }}
                />
                <Icon
                  path={showPassword ? EYE_OPEN_ICON : EYE_CLOSE_ICON}
                  maxWidth={20}
                  onClick={togglePassword}
                  classes={classes.icon}
                />

              </div>
              {
                errors.password && (
                  <p style={{
                    position: 'absolute',
                    color: '#d32f2f',
                    marginTop: '0',
                    fontSize: '12px'
                  }}>{errors.password}</p>
                )
              }
              <Typography
                onClick={handleResetEmail}
                style={{
                  textAlign: 'end',
                  color: '#895700',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  marginBottom: 8,
                  marginTop: 5

                }}
              >
                Lupa password
              </Typography>
            </Grid>
            <Grid
              item
            >
              <Button
                text='Login'
                color='primary'
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
          </Stack>

        </Form>
      </Grid>
    </>
  )
}

LoginFormComponent.propTypes = {
  values: PropTypes.object,
  errors: PropTypes.object,
  stateLoading: PropTypes.string,
  handleInputChange: PropTypes.func,
  handleLogin: PropTypes.func,
  rememberMe: PropTypes.bool,
  handleResetEmail: PropTypes.func,
  setRememberMe: PropTypes.func
}

export default LoginFormComponent