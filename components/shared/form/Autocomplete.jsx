import React from 'react'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import PropTypes from 'prop-types'
import { Box, Chip, Typography } from '@mui/material'
import { Cancel } from '@mui/icons-material'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  autocomplete: {
    border: '1px solid #000',
    borderRadius: '8px'
  },
  input: {
    '& .MuiInputBase-root': {
      borderRadius: '8px'
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
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
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
        getOptionLabel={(option) => option.title}
        filterSelectedOptions
        className={classes.autocomplete}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder={placeholder}
            className={classes.input}
          />
        )}
        renderTags={(tagValue, getTagProps) =>
          tagValue.map((option, index) => (
            <Chip
              key={index}
              label={option.title}
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
