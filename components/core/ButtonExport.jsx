import React, { Fragment, useState } from 'react'
import { Button as ButtonMui, Menu, MenuItem } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import PropTypes from 'prop-types'
import { Button } from '../shared'

function ButtonExport({ data }) {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  if (data.length == 1) {
    return <Button text='Export' color='success' onClick={data[0]?.action} />
  }

  return (
    <Fragment>
      <ButtonMui
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
      </ButtonMui>
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
      >
        {data.map((item, index) => (
          <MenuItem
            key={index}
            onClick={item?.action}
            sx={{
              width: '100px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {item?.name}
          </MenuItem>
        ))}
      </Menu>
    </Fragment>
  )
}

ButtonExport.propTypes = {
  data: PropTypes.object
}

export default ButtonExport
