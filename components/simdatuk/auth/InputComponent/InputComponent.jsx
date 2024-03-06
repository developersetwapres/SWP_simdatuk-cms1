import React, { useEffect } from 'react'
import { Input, InputLabel } from '@mui/material'
import { Icon } from '@/components/shared/index'
import { EYE_OPEN_ICON, EYE_CLOSE_ICON } from '@/utils/iconConstant'
import PropTypes from 'prop-types'
import { makeStyles } from '@mui/styles'


const useStyles = makeStyles({
  icon: {
    cursor: 'pointer',
    position: 'absolute',
    top: '60%',
    right: 0,
    transform: 'translate(-50%,-50%)'
  }
})

const InputComponent = ({
  name,
  blur,
  change,
  values,
  textLabel,
  errors,
  placeholder,
  type
}) => {

  const classes = useStyles()
  const [showPassword, setShowPassword] = React.useState(true)
  const [inputType, setInputType] = React.useState(type)


  const togglePassword = () => {
    setShowPassword(showPassword => !showPassword)
  }


  useEffect(() => {
    if (showPassword) {
      setInputType('text')
    } else if (!showPassword) {
      setInputType('password')
    }
  }, [showPassword])


  return (
    <>
      <InputLabel
        htmlFor={name}
        sx={{
          fontWeight: 'bold'
        }}
      >
        {textLabel}
      </InputLabel>
      <div style={{
        position: 'relative'
      }}>
        <Input
          type={showPassword ? type : inputType}
          id={name}
          name={name}
          onBlur={blur}
          onChange={change}
          value={values}
          placeholder={placeholder}
          disableUnderline
          sx={{
            width: '100%',
            paddingLeft: '5px',
            paddingRight: {
              xs: '10%',
              sm: '5%',
              md: '15%'
            },
            marginTop: '5px',
            borderRadius: '5px',
            height: '35px',
            backgroundColor: '#fff',
            border: `1px solid ${errors ? 'red' : 'black'}`,
            '& input::placeholder': {
              fontSize: '12px'
            }
          }}
        />
        {type === 'password' ? (
          <Icon
            path={showPassword ? EYE_OPEN_ICON : EYE_CLOSE_ICON}
            maxWidth={20}
            onClick={togglePassword}
            classes={classes.icon}
          />
        ) : ''}
      </div>
      {
        errors && (
          <p style={{
            position: 'absolute',
            color: '#d32f2f',
            margin: '1px 0',
            fontSize: '12px'
          }}>{errors}</p>
        )
      }
    </>
  )
}

InputComponent.propTypes = {
  name: PropTypes.string,
  blur: PropTypes.func,
  change: PropTypes.func,
  values: PropTypes.string,
  textLabel: PropTypes.string,
  errors: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string
}

export default InputComponent
