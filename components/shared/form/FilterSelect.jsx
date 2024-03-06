import React from 'react'
import PropTypes from 'prop-types'
import { Autocomplete, TextField } from '@mui/material'

/**
 * 
 * Filter Select
 * 
 * @param {*} params
 * @returns
 */
function FilterSelect({
  name,
  label,
  value,
  size,
  sizeInput,
  margin,
  variant,
  options,
  error = null,
  onChange,
  placeholder,
  otherStyle,
  ...other
}) {
  const filteredOptions = Array.isArray(value)
    ? options.filter(item => !value?.map(i => i?.id)?.includes(item?.id))
    : options.filter(item => item.id !== value?.id)

  /**
     * Convert To Definition Event Params
     * @param {*} name
     * @param {*} value
     */
  const convertParams = (name, value) => ({
    target: {
      name, value
    }
  })

  return (
    <Autocomplete
      // freeSolo
      size={size || 'small'}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      getOptionLabel={option => (option.text || value.name) || ''}
      // getOptionLabel={option => (option?.id === value?.id ? option.text : '')}
      options={filteredOptions}
      value={value}
      onChange={(e, v) => onChange(convertParams(name, v))}
      {...other}
      renderInput={(params) => (
        <TextField
          {...params}
          name={name}
          size={sizeInput || 'small'}
          label={label}
          margin={margin || 'normal'}
          variant={variant || 'outlined'}
          style={otherStyle}
          // inputProps={{ ...params.inputProps, type: 'search' }}
          {...(error && { error: true, helperText: error })}
          placeholder={placeholder || ''}
        />
      )}
    />
  )
}

FilterSelect.propTypes = {
  name: PropTypes.string,
  label: PropTypes.any,
  value: PropTypes.any,
  size: PropTypes.any,
  sizeInput: PropTypes.any,
  margin: PropTypes.any,
  variant: PropTypes.any,
  options: PropTypes.array,
  error: PropTypes.any,
  placeholder: PropTypes.string,
  otherStyle: PropTypes.object,
  onChange: PropTypes.func
}

export default FilterSelect