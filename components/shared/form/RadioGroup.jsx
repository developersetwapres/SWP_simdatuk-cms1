import React from 'react'
import PropTypes from 'prop-types'
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup as MuiRadioGroup,
  styled,
  useRadioGroup,
  // eslint-disable-next-line no-unused-vars
  FormHelperText
} from '@mui/material'
import { makeStyles } from '@mui/styles'

// eslint-disable-next-line no-unused-vars
const useStyles = makeStyles(theme => ({
  rootControl: {
    width: '100%',
    marginTop: '1rem',
    marginBottom: '1rem'
  }
}))

const StyledFormControlLabel = styled((props) => <FormControlLabel {...props} />)(
  ({ theme, checked }) => ({
    '.MuiFormControlLabel-label': checked
      ? {
        color: theme.palette.primary.main
        // fontSize: '1.125rem',
        // lineHeight: '22.4px',
        // fontWeight: 'bold'
      } : {
        color: '#000'
        // fontSize: '1.125rem',
        // lineHeight: '22.4px',
        // fontWeight: 'bold'
      }
  })
)

function Label(props) {
  const radioGroup = useRadioGroup()

  let checked = false

  if (radioGroup) {
    checked = radioGroup.value === props.value
  }

  return <StyledFormControlLabel checked={checked} {...props} />
}

Label.propTypes = {
  value: PropTypes.any
}

/**
 * 
 * Radio Group 
 * 
 * @param {*} params 
 * @returns
 */
function RadioGroup({
  name,
  label,
  value,
  items,
  onChange = () => { },
  // eslint-disable-next-line no-unused-vars
  error,
  ...others
}) {
  const classes = useStyles()

  /**
   * 
   * Conver to definition Event Params
   * @param {*} name 
   * @param {*} value
   */
  const convertParams = (name, value) => ({
    target: {
      name, value
    }
  })
  return (
    <FormControl component='fieldset' className={classes.rootControl}>
      <FormLabel component='legend' sx={{
        // fontSize: '1.125rem',
        // lineHeight: '28px',
        // fontWeight: 'bold',
        color: '#000'
      }}>{label}</FormLabel>
      <MuiRadioGroup
        aria-label={label}
        name={name}
        value={value}
        {...others}
        onChange={e => onChange(convertParams(name, e.target.value))}
      >
        {
          items.map((item, index) => (
            <Label
              key={index}
              value={item.id}
              control={<Radio />}
              label={item.text}
            />
          ))
        }
      </MuiRadioGroup>
    </FormControl>
  )
}

RadioGroup.propTypes = {
  name: PropTypes.string,
  label: PropTypes.any,
  value: PropTypes.any,
  items: PropTypes.array,
  error: PropTypes.any,
  onChange: PropTypes.any
}

export default RadioGroup