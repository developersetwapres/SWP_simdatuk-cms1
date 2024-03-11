import React, { Fragment, useState } from 'react'
import { Button, Menu, MenuItem } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import PropTypes from 'prop-types'

function ButtonExport() {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <Fragment>
      <Button
        id='basic-button'
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{
          bgcolor: '#16bb58',
          '&:hover': {
            bgcolor: '#16bb40'
          }
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            color: 'white'
          }}
        >
          Export
          <KeyboardArrowDownIcon />
        </div>
      </Button>
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
      >
        <MenuItem >Pdf</MenuItem>
        <MenuItem >XML</MenuItem>
        <MenuItem>DOC Out</MenuItem>
      </Menu>
    </Fragment>
  )
}

ButtonExport.propTypes = {
  handleModalLogout: PropTypes.func
}

export default ButtonExport