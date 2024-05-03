import React from 'react'
import PropTypes from 'prop-types'
import { Paper as MuiPaper } from '@mui/material'
import { styled } from '@mui/styles'

const Wrapper = styled(MuiPaper)({
  '&.MuiPaper-root': {
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 0 8px rgba(0, 0, 0, 0.1)'
  }
})

function Paper({ children, ...others }) {
  return <Wrapper {...others}>{children}</Wrapper>
}

Paper.propTypes = {
  children: PropTypes.node
}

export default Paper
