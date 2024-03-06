import React from 'react'
import {
  Box,
  Drawer as DrawerBase
} from '@mui/material'
import PropTypes from 'prop-types'
import { styled } from '@mui/styles'

const MuiDrawer = styled(DrawerBase)({
  '& .MuiDrawer-paper': {
    backgroundColor: '#2F2F2F',
    color: '#fff',
    fontSize: '14px'
  }
})

function Drawer({
  open,
  drawer,
  drawerWidth,
  setOpen = () => { },
  container = () => { }
}) {
  const handleOpen = () => {
    setOpen(open)
  }

  return (
    <Box
      component='nav'
      sx={{
        width: {
          sm: drawerWidth
        },
        flexShrink: {
          sm: 0
        }
      }}
      aria-label='mailbox folders'
    >
      <MuiDrawer
        container={container}
        variant='temporary'
        open={open}
        onClose={handleOpen}
        ModalProps={{
          keepMounted: true
        }}
        sx={{
          display: {
            xs: 'block',
            sm: 'none'
          },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            '&::-webkit-scrollbar': {
              width: '10px'
            },
            '&::-webkit-scrollbar-track': {
              background: 'transparent',
              borderRadius: '10px'
            },
            '&::-webkit-scrollbar-thumb': {
              background: '#888',
              borderRadius: '10px',
              '&:hover': {
                background: '#555'
              }
            }
          }
        }}
      >
        {drawer}
      </MuiDrawer>
      <MuiDrawer
        variant='permanent'
        sx={{
          display: {
            xs: 'none',
            sm: 'block'
          },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            '&::-webkit-scrollbar': {
              width: '0px'
            },
            '&::webkit-scrollbar-track': {
              background: 'transparent',
              borderRadius: '10px'
            },
            '&::webkit-scrollbar-thumb': {
              background: '#888',
              borderRadius: '10px',
              '&:hover': {
                background: '#555'
              }
            }
          }
        }}
        open
      >
        {drawer}
      </MuiDrawer>
    </Box>
  )
}

Drawer.propTypes = {
  open: PropTypes.bool,
  drawer: PropTypes.any,
  drawerWidth: PropTypes.number,
  setOpen: PropTypes.func,
  container: PropTypes.func
}

export default Drawer