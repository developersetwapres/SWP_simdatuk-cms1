/* eslint-disable no-unused-vars */
/* eslint-disable @next/next/no-img-element */
import React from 'react'
import {
  AppBar as MuiAppBase,
  Toolbar,
  IconButton,
  Box,
  Typography
} from '@mui/material'
import { Menu } from '@mui/icons-material'
import PropTypes from 'prop-types'

function Appbar({ open, drawerWidth, setOpen = () => {} }) {
  const handleOpen = () => {
    setOpen(open)
  }

  return (
    <MuiAppBase
      elevation={0}
      position='absolute'
      open={open}
      sx={{
        width: {
          sm: `calc(100% - ${drawerWidth}px)`
        },
        bgcolor: '#fff',
        color: '#000',
        ml: {
          sm: `${drawerWidth}`
        }
      }}
    >
      <Toolbar
        sx={{
          pr: '0px',
          justifyContent: {
            xs: 'space-between'
          }
        }}
      >
        <IconButton
          color='inherit'
          aria-label='open drawer'
          edge='start'
          onClick={handleOpen}
          sx={{
            mr: 2,
            display: {
              sm: 'none'
            }
          }}
        >
          <Menu />
        </IconButton>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              flexDirection: {
                xl: 'row',
                lg: 'row',
                md: 'row',
                sm: 'row',
                xs: 'column'
              }
            }}
          >
            <IconButton
              color='inherit'
              aria-label='open drawer'
              edge='start'
              sx={{
                width: '40px',
                height: '40px',
                display: {
                  xl: 'flex',
                  lg: 'flex',
                  md: 'flex',
                  sm: 'flex',
                  xs: 'none'
                },
                alignItems: 'center'
              }}
            >
              <Menu />
            </IconButton>
            <Typography
              sx={{
                fontSize: '12px'
              }}
            >
              SIMDATUK (SISTEM INFORMASI MANAJEMEN DATA DUKUNGAN KEPEGAWAIAN
              SEKRETARIAT WAKIL PRESIDEN)
            </Typography>
          </Box>
        </Box>
      </Toolbar>
    </MuiAppBase>
  )
}

Appbar.propTypes = {
  open: PropTypes.bool,
  drawerWidth: PropTypes.number,
  setOpen: PropTypes.func
}

export default Appbar
