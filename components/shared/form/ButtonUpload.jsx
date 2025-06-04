/* eslint-disable no-unused-vars */
import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@mui/styles'
import { Button } from '@/components/shared/index'
import { primaryButtonStyle } from '@/utils/theme'

const useStyles = makeStyles({
  fileUpload: {
    display: 'none'
  },
  helperText: {
    color: 'red',
    fontSize: '0.75',
    lineHeight: '1.66',
    textAlign: 'left',
    margin: '4px 14px 0 14px'
  }
})

/**
 * Button File Upload
 * 
 * @param {*} params 
 * @returns
 */
function ButtonUpload({
  name,
  value,
  error = null,
  accept = 'image/*',
  onChange = () => { },
  text,
  ...others
}) {
  const classes = useStyles()

  const convertParams = (name, value) => {
    const reader = new FileReader()
    reader.readAsDataURL(value || '')

    const obj = {
      target: {
        name, value
      }
    }

    return obj
  }

  return (
    <Fragment>
      <input
        id='input-file'
        type='file'
        className={classes.fileUpload}
        accept={accept}
        onChange={(e) => onChange(
          convertParams(name, e.target.files[0])
        )}
        {...others}
      />
      <label htmlFor='input-file'>
        <Button
          text={text}
          component='span'
          color='warning'
          sx={{
            textTransform: 'none',
            ...primaryButtonStyle
          }}
        />
      </label>
    </Fragment>
  )
}

ButtonUpload.propTypes = {
  name: PropTypes.string,
  value: PropTypes.any,
  error: PropTypes.any,
  accept: PropTypes.any,
  text: PropTypes.string,
  onChange: PropTypes.func
}

export default ButtonUpload