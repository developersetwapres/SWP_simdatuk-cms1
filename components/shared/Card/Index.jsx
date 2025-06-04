import React from 'react'
import PropTypes from 'prop-types'
import { Card as CardMui } from '@mui/material'

const style = {
  card: {
    padding: '20px',
    width: '100%',
    height: 'fit-content',
    borderRadius: '10px'
  }
}

const Card = ({ children, otherStyle }) => {
  return <CardMui sx={{ ...style?.card, ...otherStyle }}>{children}</CardMui>
}

Card.propTypes = {
  children: PropTypes.node,
  otherStyle: PropTypes.object
}

export default Card
