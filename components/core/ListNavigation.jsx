import { ListItemButton } from '@mui/material'
import React from 'react'
import PropTypes from 'prop-types'

const ListNavigation = ({
  name,
  selected = false,
  handleClick,
  otherStyle
}) => {
  return (
    <ListItemButton
      on
      selected={selected}
      name={name}
      sx={{
        ...otherStyle,
        '&.Mui-selected': {
          backgroundColor: '#895700',
          borderRadius: '6px',
          color: '#FFF'
        }
      }}
      onClick={(e) => handleClick(e)}
    >
      {name}
    </ListItemButton>
  )
}
ListNavigation.propTypes = {
  otherStyle: PropTypes.object,
  selected: PropTypes.bool,
  name: PropTypes.string,
  handleClick: PropTypes.func
}

export default ListNavigation
