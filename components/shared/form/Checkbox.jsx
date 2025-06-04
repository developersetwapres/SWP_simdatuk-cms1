import React from 'react'
import {
  Checkbox,
  FormControl,
  FormControlLabel
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import PropTypes from 'prop-types'

const useStyles = makeStyles(() => ({
  rootControl: {
    width: '100%',
    marginBottom: '1rem'
  }
}))

/**
 * 
 * Checkbox 
 * 
 * @param {*} params
 * @returns 
 */

function CheckBox({
  name,
  text,
  label,
  color,
  size,
  value,
  otherStyle,
  onChange = () => { },
  ...others
}) {
  const classes = useStyles()

  /**
   * Convert To Definition Event Params 
   * 
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
      <p>{text}</p>
      <FormControl className={classes.rootControl}
        sx={{
          marginTop: '-20px'
        }}
        style={otherStyle}
      >
        <FormControlLabel
          label={label}
          className={classes.label}
          control={
            <Checkbox
              name={name}
              color={color || 'primary'}
              checked={value}
              size={size || 'small'}
              onChange={e => onChange(
                convertParams(name, e.target.checked)
              )}
              {...others}
            />
          }
        >
        </FormControlLabel>
      </FormControl>
    </>
  )
}

CheckBox.propTypes = {
  name: PropTypes.string,
  text: PropTypes.string,
  label: PropTypes.any,
  color: PropTypes.any,
  size: PropTypes.any,
  value: PropTypes.any,
  otherStyle: PropTypes.object,
  onChange: PropTypes.func
}

export default CheckBox