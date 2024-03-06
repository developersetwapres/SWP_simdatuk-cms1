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
    // fontSize: '1.125rem',
    // lineHeight: '25.2px',
    // fontWeight: '700',
    fontFamily: 'roboto',
    resize: 'none',
    border: (props) => props.error ? '1px solid #000' : '1px solid #BABABA',
    // '&:hover': {
    //   border: (props) => props.error ? '1px solid #000' : '1px solid #fff'
    // },
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
    lineHeight: '24px',
    // fontWeight: 'bold',
    marginBottom: '8px',
    color: '#000'
  },
  helperText: {
    color: '#D32F2F',
    fontSize: '14px',
    lineHeight: '1.66',
    textAlign: 'left'
    // margin: '4px 14px 0 14px'
  }
})

function TextArea({
  rows,
  name,
  label,
  value,
  error = null,
  className,
  onChange = () => { },
  ...others
}) {
  const classes = useStyles()
  return (
    <FormGroup>
      {
        label && (
          <p className={classes.label}>{label}</p>
        )
      }
      <TextareaAutosize
        className={className || classes.root}
        minRows={rows}
        name={name}
        value={value}
        onChange={onChange}
        {...others}
      />
      {
        error && (
          <p className={classes.helperText}>
            {error}
          </p>
        )
      }
    </FormGroup>
  )
}

TextArea.propTypes = {
  rows: PropTypes.number,
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  className: PropTypes.any,
  error: PropTypes.any,
  onChange: PropTypes.func
}

export default TextArea