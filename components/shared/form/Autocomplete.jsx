import React from 'react'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import PropTypes from 'prop-types'
import Icon from '../Icon'
import { ARROW_DOWN } from '@/utils/iconConstant'

function MuiAutocomplete({
  // label,
  options,
  value,
  name,
  placeholder,
  disabled = false,
  error = false,
  onChange = () => { },
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
    <>
      {/* <p style={{
        marginBottom: '8px'
      }}>{label}</p> */}
      <Autocomplete
        freeSolo
        value={value}
        id='controllable-states-demo'
        options={filteredOptions}
        isOptionEqualToValue={(option, value) => value.id === option.id}
        getOptionLabel={(option) => (option.text || option.name) ?? ''}
        onChange={(e, v) => onChange(convertParams(name, v))}
        {...other}
        disableClearable
        sx={{
          backgroundColor: disabled ? '#EDEDED' : ''
        }}
        disabled={disabled}
        renderInput={(params) => (
          <TextField
            {...params}
            name={name}
            size='small'
            variant='outlined'
            placeholder={placeholder}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <Icon
                  path={ARROW_DOWN}
                  maxWidth={20}
                />
              )
            }}
            {...(error && { error: true, helperText: error })}
          />
        )}
      />
    </>
  )
}

MuiAutocomplete.propTypes = {
  placeholder: PropTypes.string,
  label: PropTypes.string,
  options: PropTypes.array,
  value: PropTypes.any,
  name: PropTypes.any,
  disabled: PropTypes.bool,
  error: PropTypes.any,
  onChange: PropTypes.func
}

export default MuiAutocomplete