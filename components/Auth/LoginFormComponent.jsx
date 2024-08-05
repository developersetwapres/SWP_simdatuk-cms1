/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useMemo, useState } from 'react'
import { Input, Button, Icon, Form } from '@/components/shared/index'
import PropTypes from 'prop-types'
import { EYE_OPEN_ICON, EYE_CLOSE_ICON } from '@/utils/iconConstant'
import { makeStyles } from '@mui/styles'
import { Box, Grid, Stack, Typography } from '@mui/material'
import { primaryButtonStyle } from '@/utils/theme'
import ReCAPTCHAForm from './ReCAPTCHAForm'

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
  handleInputChange = () => {},
  handleLogin = () => {},
  handleResetEmail = () => {}
}) {
  const [showPassword, setShowPassword] = useState(false)
  const [token, setToken] = useState(null)
  const classes = useStyles()

  const isLogin = useMemo(() => {
    return !(token && values.password && values.username)
  }, [token, values])

  const togglePassword = () => {
    setShowPassword((showPassword) => !showPassword)
  }

  useEffect(() => {
    const payload = { target: { name: 'recaptchaToken', value: token || '' } }
    handleInputChange(payload)
  }, [token])

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
            lg: '480px',
            xl: '480px'
          }
        }}
      >
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
          <Stack spacing={2}>
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
              {errors.username && (
                <p
                  style={{
                    position: 'absolute',
                    color: '#d32f2f',
                    marginTop: '0',
                    fontSize: '12px'
                  }}
                >
                  {errors.username}
                </p>
              )}
            </Grid>
            <Grid item>
              <div
                style={{
                  position: 'relative'
                }}
              >
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
              {errors.password && (
                <p
                  style={{
                    position: 'absolute',
                    color: '#d32f2f',
                    marginTop: '0',
                    fontSize: '12px'
                  }}
                >
                  {errors.password}
                </p>
              )}
              <Box
                sx={{
                  margin: '20px 0 4px 0',
                  display: 'felx',
                  alignItems: 'start',
                  justifyContent: 'space-between',
                  position: 'relative'
                }}
              >
                <ReCAPTCHAForm setToken={setToken} />
                <Typography
                  onClick={handleResetEmail}
                  style={{
                    textAlign: 'end',
                    color: '#895700',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    position: 'absolute',
                    top: 0,
                    right: 0
                  }}
                >
                  Lupa password
                </Typography>
              </Box>
            </Grid>
            <Grid item>
              <Button
                text='Login'
                color='primary'
                sx={{
                  ...primaryButtonStyle,
                  textTransform: 'none'
                }}
                type='submit'
                fullWidth
                isBusy={stateLoading?.isBusy || isLogin}
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
