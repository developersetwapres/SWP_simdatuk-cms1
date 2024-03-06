import React from 'react'
import PropTypes from 'prop-types'
import {
  LocalizationProvider,
  DatePicker as MuiDatePicker
} from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import { TextField } from '@mui/material'

/**
 * 
 * Date Picker 
 * 
 * @param {*} params 
 * @returns
 */
function DatePicker({
  name,
  label,
  value,
  error = null,
  onChange,
  ...others
}) {
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
    <LocalizationProvider dateAdapter={AdapterDateFns} >
      <p style={{
        fontSize: '1.125rem',
        lineHeight: '28px',
        fontWeight: 'bold',
        color: '#F53340'
      }}>{label}</p>
      <MuiDatePicker
        views={['day', 'month', 'year']}
        value={value}
        sx={{
          height: 'auto'
        }}
        onChange={date => onChange(convertParams(name, date))}
        InputAdornmentProps={{ position: 'start' }}
        renderInput={(params) =>
          <TextField
            {...params}
            size='small'
            margin='dense'
            variant='outlined'
            fullWidth
            {...others}
            {...(error && { error: true, helperText: error })}
            sx={{
              marginBottom: '1rem',
              '& .MuiInputBase-input': {
                fontSize: '1.125rem',
                lineHeight: '25.2px',
                fontWeight: '700',
                '&::placeholder': {
                  fontSize: '1rem',
                  lineHeight: '22.4px',
                  fontWeight: '400',
                  color: '#BDBDBD'
                }
              },
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: '#000'
                }
              }
            }}
          />
        }
      />
    </LocalizationProvider>
  )
}

DatePicker.propTypes = {
  name: PropTypes.string,
  label: PropTypes.any,
  value: PropTypes.any,
  error: PropTypes.any,
  onChange: PropTypes.any
}