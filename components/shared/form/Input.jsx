import React from 'react'
import { Box, TextField } from '@mui/material'
import PropTypes from 'prop-types'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
  label: {
    fontSize: '14px',
    fontWeight: 500,
    margin: '0 0 8px 0'
  },
  root: {
    width: '100%',
    '& .MuiInputBase-root': {
      border: '1.2px solid #394346',
      borderRadius: '6px',
      '&.Mui-focused': {
        border: 'none'
      },
      '& input': {
        padding: '12px'
      }
    }
  }
})

/**
 * Input
 *
 * @param {*} props
 * @returns
 */

function Input({
  name,
  label,
  value,
  autoComplete = 'off',
  variant,
  size,
  error = null,
  classesLabel,
  onChange,
  ...others
}) {
  const classes = useStyles()
  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      {label && (
        <p className={classesLabel ? classesLabel : classes.label}>{label}</p>
      )}
      <TextField
        className={classes.root}
        variant={variant || 'outlined'}
        name={name}
        value={value || ''}
        size={size || 'small'}
        onChange={onChange}
        {...others}
        autoComplete={autoComplete}
        {...(error && { error: true, helperText: error })}
      />
    </Box>
  )
}

Input.propTypes = {
  name: PropTypes.string,
  label: PropTypes.any,
  value: PropTypes.any,
  autoComplete: PropTypes.any,
  variant: PropTypes.any,
  size: PropTypes.any,
  error: PropTypes.any,
  classesLabel: PropTypes.any,
  onChange: PropTypes.any
}

export default Input
