import React from 'react'
import ProgressBar from '@ramonak/react-progress-bar'
import { makeStyles } from '@mui/styles'
import PropTypes from 'prop-types'

const useStyles = makeStyles({
  root: {}
})

const LinearProgressBar = ({
  value = 50,
  bgColor,
  baseBgColor,
  borderRadius = '0px'
}) => {
  const classes = useStyles()

  return (
    <ProgressBar
      completed={value}
      bgColor={bgColor}
      baseBgColor={baseBgColor}
      borderRadius={borderRadius}
      isLabelVisible={false}
      className={classes.root}
    />
  )
}

LinearProgressBar.propTypes = {
  value: PropTypes.number,
  bgColor: PropTypes.string,
  baseBgColor: PropTypes.string,
  borderRadius: PropTypes.string,
  props: PropTypes.any
}

export default LinearProgressBar