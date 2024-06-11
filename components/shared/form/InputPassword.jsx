import React, { useState } from 'react'
import { Box } from '@mui/material'
import { Input, Icon } from '@/components/shared'
import { EYE_OPEN_ICON, EYE_CLOSE_ICON } from '@/utils/iconConstant'
import { makeStyles } from '@mui/styles'
import PropTypes from 'prop-types'

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },
  wrapper: {
    position: 'relative'
  },
  icon: {
    cursor: 'pointer',
    position: 'absolute',
    top: '70%',
    right: '1%',
    transform: 'translate(-50%, -50%)'
  },
  inputError: {
    backgroundColor: '#fff',
    borderRadius: '6px',
    border: '1px solid #d32f2f !important'
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: '6px',
    border: '1.2px solid #394346 !important',
    '&.Mui-focused': {
      border: 'none'
    },
    '&.Mui-disabled': {
      background: 'rgba(146, 146, 146, 0.15)'
    },
    '& input': {
      padding: '12px'
    }
  },
  fontBold: {
    fontWeight: '600',
    padding: '0',
    margin: '0'
  },
  error: {
    color: '#d32f2f',
    marginTop: '0',
    fontSize: '12px'
  }
})

function InputPassword({
  label,
  placeholder,
  value,
  error = '',
  onChange
}) {
  const classes = useStyles()
  const [showPassword, setShowPassword] = useState(false)
  const togglePassword = () => setShowPassword(!showPassword)

  return (
    <Box className={classes.container}>
      <Box className={classes.wrapper}>
        <Input
          fullWidth
          classesLabel={classes.fontBold}
          label={label}
          placeholder={placeholder}
          type={showPassword ? 'text' : 'password'}
          name='password'
          value={value}
          onChange={onChange}
          className={error ? classes.inputError : classes.input}
        />
        <Icon
          path={showPassword ? EYE_OPEN_ICON : EYE_CLOSE_ICON}
          maxWidth={20}
          onClick={togglePassword}
          classes={classes.icon}
        />
      </Box>
      {
        error && (
          <p className={classes.error}>{error}</p>
        )
      }
    </Box>
  )
}

InputPassword.propTypes = {
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func
}

export default InputPassword