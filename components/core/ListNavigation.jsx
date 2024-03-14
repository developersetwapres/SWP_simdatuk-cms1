import {
  ListItemButton
} from '@mui/material'
import React from 'react'
import PropTypes from 'prop-types'


const ListNavigation = ({
  name
}) => {

  const handleClick = (value) => {
    console.log(value)
  }

  return (
    <>

      <ListItemButton
        on
        name={name}
        sx={{
          '&.Mui-selected': {
            backgroundColor: '#000'
          }
        }}
        onClick={(e) => handleClick(e)}
      >
        {name}
      </ListItemButton >
    </>
  )
}
ListNavigation.propTypes = {
  selectedIndex: PropTypes.number,
  name: PropTypes.string
  // handleClick: PropTypes.func
}


export default ListNavigation
