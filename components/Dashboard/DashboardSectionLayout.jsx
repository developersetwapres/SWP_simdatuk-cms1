import React from 'react'
import PropTypes from 'prop-types'
import { Paper } from '@mui/material'

const DashboardSectionLayout = ({ children }) => {
  return (
    <Paper
      elevation={2}
      container
      direction='column'
      sx={{
        minHeight: '86vh',
        padding: '1.3rem 1.5rem',
        backgroundColor: '#fff'
      }}
    >
      {children}
    </Paper>
  )
}

DashboardSectionLayout.propTypes = {
  children: PropTypes.node
}

export default DashboardSectionLayout
