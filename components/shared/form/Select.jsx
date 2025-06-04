import React from 'react'
import PropTypes from 'prop-types'
import {
  FormControl,
  MenuItem,
  Select as MuiSelect,
  FormHelperText
} from '@mui/material'

import { makeStyles } from '@mui/styles'
import { KeyboardArrowDown } from '@mui/icons-material'

const useStyles = makeStyles((theme) => ({
  formControl: {
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: '#BABABA'
      },
      fontWeight: 'normal'
    }
  },
  label: {
    fontSize: '1rem',
    lineHeight: '24px',
    color: theme.palette.primary.main,
    marginBottom: '10px'
  },
  select: {
    fontSize: '1.125rem',
    lineHeight: '25.2px'
  },
  disabled: {
    backgroundColor: '#EDEDED'
  }
}))

/**
 *
 * Select
 *
 * @param {*} params
 * @returns
 */
function Select({
  name,
  label,
  value,
  // eslint-disable-next-line no-unused-vars
  margin,
  size,
  options,
  className,
  // eslint-disable-next-line no-unused-vars
  placeholder,
  startAdornment,
  error = null,
  onChange,
  disabled,
  ...others
}) {
  const classes = useStyles()
  return (
    <FormControl
      variant='outlined'
      margin='dense'
      fullWidth
      className={
        className ? `${classes.formControl} ${className}` : classes.formControl
      }
      {...others}
      {...(error && { error: true })}
    >
      {label && <p className={classes.label}>{label}</p>}
      <MuiSelect
        className={disabled ? classes.disabled : classes.select}
        fullWidth
        name={name}
        margin='dense'
        value={value}
        IconComponent={KeyboardArrowDown}
        startAdornment={startAdornment}
        size={size || 'small'}
        onChange={onChange}
        disabled={disabled}
        displayEmpty
        renderValue={
          value !== ''
            ? undefined
            : () => <span style={{ color: '#BABABA' }}>{placeholder}</span>
        }
      >
        {options?.length > 0 &&
          options.map((item, index) => (
            <MenuItem key={index} value={item.id}>
              {item.text}
            </MenuItem>
          ))}
      </MuiSelect>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  )
}

Select.propTypes = {
  name: PropTypes.string,
  label: PropTypes.any,
  value: PropTypes.any,
  margin: PropTypes.any,
  size: PropTypes.any,
  options: PropTypes.array,
  error: PropTypes.any,
  placeholder: PropTypes.string,
  startAdornment: PropTypes.any,
  className: PropTypes.any,
  disabled: PropTypes.bool,
  onChange: PropTypes.any
}

export default Select
