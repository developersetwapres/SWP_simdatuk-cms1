import React from 'react'
import { Icon } from '@/components/shared'
import { Box } from '@mui/material'
import { makeStyles } from '@mui/styles'
import PropTypes from 'prop-types'

const useStyles = makeStyles({
  root: {
    backgroundColor: '#FFEAD0',
    color: '#A9630F',
    padding: '12px 24px',
    borderRadius: '8px',
    width: '240px',
    height: '104px',
    display: 'flex'
    // alignItems: 'center'
  },
  icon: {
    alignSelf: 'center'
  },
  content: {
    display: 'block',
    margin: '0 auto'
  }
})

function UserDetailHistoryCourse({
  icon,
  heading,
  value
}) {
  const classes = useStyles()
  return (
    <Box className={classes.root}>
      <div className={classes.icon}>
        <Icon
          path={icon}
          maxWidth={32}
        />
      </div>
      <div className={classes.content}>
        <div>
          <p style={{
            margin: 0
          }}
          >
            {heading}
          </p>
        </div>
        <div style={{
          textAlign: 'center'
        }}>
          <h1 style={{
            margin: '10px',
            fontWeight: '600',
            fontSize: '36px'
          }}>{value}</h1>
        </div>
      </div>
    </Box>
  )
}

UserDetailHistoryCourse.propTypes = {
  icon: PropTypes.string,
  heading: PropTypes.string,
  value: PropTypes.any
}

export default UserDetailHistoryCourse