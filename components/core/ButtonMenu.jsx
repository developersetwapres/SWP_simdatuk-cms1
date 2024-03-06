import React, { Fragment, useState } from 'react'
import { Button, Menu, MenuItem } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'

function ButtonMenu({
  handleModalLogout = () => { }
}) {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const router = useRouter()

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
          color: router.pathname === '/change-password' || router.pathname === '/profile' ? '#FE9516' : '#fff'
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <AccountCircleIcon />
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
        <MenuItem onClick={() => router.push('/profile')}>Profile</MenuItem>
        <MenuItem onClick={() => router.push('/change-password')}>Ubah Password</MenuItem>
        <MenuItem onClick={() => handleModalLogout(true)}>Log Out</MenuItem>
      </Menu>
    </Fragment>
  )
}

ButtonMenu.propTypes = {
  handleModalLogout: PropTypes.func
}

export default ButtonMenu