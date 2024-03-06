import React from 'react'
import PropTypes from 'prop-types'
import { Paper as MuiPaper } from '@mui/material'
import { styled } from '@mui/styles'

const Wrapper = styled(MuiPaper)({
  boxShadow: '0px 0px 20px rgba(133, 133, 133, 0.25)',
  padding: '2rem'  
})

function Paper({
  children,
  ...others
}) {
  return (
    <Wrapper
      {...others}   
    >
      {children}
    </Wrapper>
  )
}

Paper.propTypes = {
  children: PropTypes.node
}

export default Paper