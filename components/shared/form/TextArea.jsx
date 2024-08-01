import React from 'react'
import PropTypes from 'prop-types'
import { FormGroup, TextareaAutosize } from '@mui/material'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
  root: {
    borderRadius: '4px',
    padding: '1rem',
    width: '100%',
    WebkitBoxSizing: 'border-box',
    MozBoxSizing: 'border-box',
    boxSizing: 'border-box',
    fontFamily: 'roboto',
    resize: 'none',
    border: (props) => (props.error ? '1px solid #000' : '1px solid #BABABA'),
    '&::placeholder': {
      fontSize: '14px',
      lineHeight: '20x',
      fontWeight: '400',
      color: '#BABABA',
      fontFamily: 'roboto'
    }
  },
  label: {
    fontSize: '16px',
    margin: '0 0 8px 0',
    color: '#000'
  },
  helperText: {
    color: '#D32F2F',
    fontSize: '14px',
    lineHeight: '1.66',
    textAlign: 'left',
    margin: '4px 0 0 0'
  }
})

function TextArea({
  rows,
  name,
  label,
  value,
  error = null,
  className,
  placeholder,
  fullWidth = false,
  onChange = () => {},
  ...others
}) {
  const classes = useStyles()
  return (
    <FormGroup sx={{ width: fullWidth ? '100%' : 'unset' }}>
      {label && <p className={classes.label}>{label}</p>}
      <TextareaAutosize
        className={className || classes.root}
        minRows={rows}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        {...others}
      />
      {error && <p className={classes.helperText}>{error}</p>}
    </FormGroup>
  )
}

TextArea.propTypes = {
  rows: PropTypes.number,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  fullWidth: PropTypes.bool,
  value: PropTypes.string,
  className: PropTypes.any,
  error: PropTypes.any,
  onChange: PropTypes.func
}

export default TextArea
