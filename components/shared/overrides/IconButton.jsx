/* eslint-disable @next/next/no-img-element */
import React from 'react'
import PropTypes from 'prop-types'
import { Button, IconButton as MuiIcon } from '@mui/material'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: 'auto',
    maxWidth: '48px'
  }
})

function IconButton({
  path,
  rounded,
  classesChild,
  maxWidth,
  ...others
}) {
  const classes = useStyles()
  return (
    rounded
      ? (
        <MuiIcon
          className={`${classes.root} ${classesChild}`}
          {...others}
        >
          <img
            src={path}
            alt='icon'
            className={`${classes.root} ${classesChild}`}
            style={{
              maxWidth: maxWidth || '',
              width: '100%',
              height: 'auto'
            }}
          />
        </MuiIcon>
      ) : (
        <Button
          className={classes.root}
          {...others}
        >
          <img
            src={path}
            alt='icon'
            className={classes.root}
            style={{
              maxWidth: maxWidth || '',
              width: '100%',
              height: 'auto'
            }}
          />
        </Button>
      )
  )
}

IconButton.propTypes = {
  path: PropTypes.string,
  rounded: PropTypes.bool,
  maxWidth: PropTypes.number,
  classesChild: PropTypes.string
}

export default IconButton