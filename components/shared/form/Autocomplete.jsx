/* eslint-disable no-unused-vars */
import React from 'react'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import PropTypes from 'prop-types'
import { Box, Chip, Typography } from '@mui/material'
import { Cancel } from '@mui/icons-material'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(() => ({
  input: {
    '& .MuiOutlinedInput-root.MuiOutlinedInput-root': {
      padding: '12px',
      border: '1.2px solid #000',
      borderRadius: '6px',

      '&.Mui-focused': {
        border: 'none'
      },

      '& input': {
        padding: 'unset'
      }
    }
  }
}))

function MuiAutocomplete({
  label,
  options,
  value,
  name,
  placeholder,
  disabled = false,
  error = false,
  onChange = () => {},
  multiple = false,
  ...other
}) {
  const classes = useStyles()

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      {label && (
        <Typography
          component='p'
          sx={{ marginBottom: '8px', fontSize: '14px', fontWeight: 500 }}
        >
          {label}
        </Typography>
      )}
      <Autocomplete
        multiple={multiple}
        id='tags-outlined'
        options={options}
        value={value}
        getOptionLabel={(option) => option}
        filterSelectedOptions
        onChange={(e, val) => onChange(val)}
        renderInput={(params) => (
          <TextField
            {...params}
            name={name}
            placeholder={placeholder}
            className={classes.input}
            {...(error && { error: true, helperText: error })}
          />
        )}
        renderTags={(tagValue, getTagProps) =>
          tagValue.map((option, index) => (
            <Chip
              key={index}
              label={option}
              {...getTagProps({ index })}
              deleteIcon={
                <Cancel
                  style={{
                    color: '#FFF',
                    opacity: 0.5,
                    transition: 'all .4s ease',
                    '&:hover': {
                      opacity: 1
                    }
                  }}
                />
              }
              sx={{ backgroundColor: '#895700', color: '#FFF' }}
            />
          ))
        }
        {...other}
      />
    </Box>
  )
}

MuiAutocomplete.propTypes = {
  placeholder: PropTypes.string,
  label: PropTypes.string,
  options: PropTypes.array,
  value: PropTypes.any,
  name: PropTypes.any,
  disabled: PropTypes.bool,
  multiple: PropTypes.bool,
  error: PropTypes.any,
  onChange: PropTypes.func
}

export default MuiAutocomplete
