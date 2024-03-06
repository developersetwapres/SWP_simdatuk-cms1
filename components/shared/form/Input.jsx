import React, { Fragment } from 'react'
import { TextField } from '@mui/material'
import PropTypes from 'prop-types'
import { makeStyles } from '@mui/styles'


const useStyles = makeStyles({
  label: {
    fontSize: '16px',
    margin: 0
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
    <Fragment>
      <p className={classesLabel ? classesLabel : classes.label}>{label}</p>
      <TextField
        margin='dense'
        variant={variant || 'outlined'}
        name={name}
        value={value || ''}
        size={size || 'small'}
        onChange={onChange}
        {...others}
        autoComplete={autoComplete}
        {...(error && { error: true, helperText: error })}
      // color='warning'
      />
      {/* </TextField> */}
    </Fragment>
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