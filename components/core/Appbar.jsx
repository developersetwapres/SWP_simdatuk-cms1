/* eslint-disable no-unused-vars */
/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react'
import {
  AppBar as MuiAppBase,
  Toolbar,
  IconButton,
  Box,
  Typography,
  TextField
} from '@mui/material'
import { Menu } from '@mui/icons-material'
import LogoutIcon from '@mui/icons-material/Logout'
import PropTypes from 'prop-types'
import { Button, ModalConfirm } from '../shared'
import { blackButtonStyle, primaryButtonStyle } from '@/utils/theme'
import { useRouter } from 'next/router'
import breadcrumbs from './breadcrumb'
import { useDispatch, useSelector } from 'react-redux'
import { AUTHENTICATION_LOGOUT_REQUESTED } from '@/store/constants'
import SearchIcon from '@mui/icons-material/Search'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  searchParent: {
    display: 'flex',
    gap: 5,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.9)',
    border: '1px solid #878787',
    outline: 'none',
    overflow: 'hidden'
  },
  input: {
    cursor: 'text',
    caretColor: '#000',
    color: '#000',
    border: 'none',
    width: '100%',
    padding: '10px 14px',
    backgroundColor: 'transparent',
    fontSize: '16px',
    transition: theme.transitions.create('width'),
    '&:focus': {
      outline: 'none'
    }
  }
}))

function Appbar({
  open,
  drawerWidth,
  setOpen = () => { }
}) {
  const router = useRouter()
  const classes = useStyles()
  const [searcOpen, setSearchOpen] = useState(false)
  const [modalLogout, setModalLogout] = useState(false)
  const dispatch = useDispatch()
  const selector = useSelector((state) => state.authentication)
  const handleOpen = () => {
    setOpen(open)
  }
  const handleModalLogout = (status) => {
    setModalLogout(status)
  }

  const pathname = router.pathname

  const breadcrumb = (
    breadcrumbs.map((value, index) => (
      pathname === value.path ? (
        <Box key={index}>{value.name}</Box>
      ) : value.children?.map((child, index) => (
        child.pathChild === pathname ? (
          // <p key={index}>{`${value.name} > ${child.name}`}</p>
          <Box
            key={index}
            sx={{
              fontSize: {
                xl: 'inherit',
                lg: 'inherit',
                md: 'inherit',
                sm: '14.5px',
                xs: '14.5px'
              }
            }}
          >
            <span>{value.name}</span>
            <span style={{ marginLeft: '9px', marginRight: '9px' }}>{'>'}</span>
            <span>{child.name}</span>
          </Box>
        ) : null
      ))
    ))
  )

  const handleLogout = () => {
    dispatch({ type: AUTHENTICATION_LOGOUT_REQUESTED })
  }

  console.log(classes.input)

  return (
    <MuiAppBase
      elevation={0}
      position='absolute'
      open={open}
      sx={{
        width: {
          sm: `calc(100%) - ${drawerWidth}px`
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
        <p></p>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: {
            xl: '80%',
            lg: '81%',
            md: '73%',
            sm: '60%',
            xs: '100%'
          }
        }}>
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
              SIMDATUK (SISTEM INFORMASI MANAJEMEN DATA DUKUNGAN KEPEGAWAIAN SEKRETARIAT WAKIL PRESIDEN)
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              flexDirection: {
                xl: 'row',
                lg: 'row',
                md: 'row',
                sm: 'column',
                xs: 'row'
              }
            }}
          >
            <TextField
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  console.log(e.target.value)
                }
              }}
              size='small'
              label='Search'
              height='50px'
              sx={{
                height: '10%',
                display: `${searcOpen ? 'flex' : 'none'}`,
                '&:focus': {
                  outline: '#000'
                }
              }}
            />
            <IconButton
              onClick={() => setSearchOpen(!searcOpen)}
              type='button'
              sx={{ p: '10px' }}
              aria-label='search'>
              <SearchIcon />
            </IconButton>
            <div
              onClick={() => handleModalLogout(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 4,
                cursor: 'pointer'
              }}
            >
              <Typography>
                Logout
              </Typography>
              <LogoutIcon />
            </div>
          </Box>
        </Box>
      </Toolbar>
      <Box sx={{
        height: {
          xl: '35px',
          lg: '35px',
          md: '35px',
          sm: '50px',
          xs: '50px'
        },
        backgroundColor: '#f4f4f4',
        display: 'flex',
        alignItems: 'center',
        justifyContent: {
          xl: 'flex-start',
          lg: 'flex-start',
          md: 'flex-start',
          sm: 'center',
          xs: 'flex-start'
        },
        padding: {
          xl: '0 290px',
          lg: '0 290px',
          md: '0 290px',
          sm: '0 10px',
          xs: '0 10px'
        }
      }}>
        {breadcrumb}
      </Box>
      {/* Modal Logout */}
      <ModalConfirm
        open={modalLogout}
      >
        <img
          src='/images/logout.png'
          alt='poto'
          style={{
            width: '100%',
            maxWidth: '520px',
            display: 'block',
            margin: '0 auto'
          }}
        />
        <p style={{
          fontWeight: 'bold',
          textAlign: 'center',
          fontSize: '21px',
          marginTop: '30px'
        }}>Apakah anda yakin untuk keluar dari Setneg Playbook?</p>
        <Box
          component='div'
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: {
              xl: 'row',
              lg: 'row',
              md: 'column',
              sm: 'column',
              xs: 'column'
            },
            justifyContent: 'space-evenly'
          }}
        >
          <Button
            text='Ya'
            color='warning'
            sx={{
              width: '100%',
              maxWidth: '240px',
              textTransform: 'none',
              marginBottom: {
                xl: 0,
                lg: 0,
                md: '10px',
                sm: '10px',
                xs: '10px'
              },
              cursor: 'pointer',
              ...primaryButtonStyle
            }}
            isBusy={selector?.isBusy}
            isLoading={selector?.loading}
            onClick={handleLogout}
          />
          <Button
            text='Tidak'
            sx={{
              width: '100%',
              maxWidth: '240px',
              textTransform: 'none',
              ...blackButtonStyle
            }}
            onClick={() => { setModalLogout(false) }}
          // onClick={handleCancelModal}
          />
        </Box>
      </ModalConfirm>
    </MuiAppBase >
  )
}

Appbar.propTypes = {
  open: PropTypes.bool,
  drawerWidth: PropTypes.number,
  setOpen: PropTypes.func
}

export default Appbar