/* eslint-disable react/prop-types */
import React from 'react'
import PropTypes from 'prop-types'
import { Button as MuiButton, CircularProgress } from '@mui/material'

function Button({
  text,
  color,
  variant,
  size,
  icon,
  isBusy = false,
  isLoading = false,
  onClick = () => {},
  ...others
}) {
  return (
    <MuiButton
      color={color || 'primary'}
      variant={variant || 'contained'}
      disabled={isBusy}
      onClick={onClick}
      size={size || 'small'}
      {...others}
    >
      {icon}
      {isBusy && isLoading ? (
        <CircularProgress size={13} color={color} />
      ) : (
        text
      )}
    </MuiButton>
  )
}

Button.propTypes = {
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  color: PropTypes.string,
  variant: PropTypes.string,
  size: PropTypes.string,
  isBusy: PropTypes.bool,
  isLoading: PropTypes.bool,
  onClick: PropTypes.any
}

export default Button
