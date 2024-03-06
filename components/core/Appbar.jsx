/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react'
import {
  AppBar as MuiAppBase,
  Toolbar,
  IconButton,
  Box
} from '@mui/material'
import { Menu } from '@mui/icons-material'
import ButtonMenu from './ButtonMenu'
import PropTypes from 'prop-types'
import { Button, ModalConfirm } from '../shared'
import { blackButtonStyle, primaryButtonStyle } from '@/utils/theme'
import Notification from './Notification'
import { useRouter } from 'next/router'
import breadcrumbs from './breadcrumb'
import { useDispatch, useSelector } from 'react-redux'
import { AUTHENTICATION_LOGOUT_REQUESTED } from '@/store/constants'

function Appbar({
  open,
  drawerWidth,
  setOpen = () => { }
}) {
  const router = useRouter()
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

  return (
    <MuiAppBase
      position='absolute'
      open={open}
      sx={{
        width: {
          sm: `calc(100%) - ${drawerWidth}px`
        },
        ml: {
          sm: `${drawerWidth}`
        }
      }}
      color='primary'
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
          // width: '10%',
          justifyContent: 'space-between',
          width: {
            xl: '80%',
            lg: '81%',
            md: '81%'
          }
        }}>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            sx={{
              display: {
                xl: 'block',
                lg: 'block',
                md: 'block',
                sm: 'none',
                xs: 'none'
              }
            }}
          >
            <Menu />
          </IconButton>
          <div>
            <Notification />
            <ButtonMenu
              handleModalLogout={handleModalLogout}
            />
          </div>
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
        backgroundColor: '#444444',
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
            // flexWrap: 'nowrap',
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
    </MuiAppBase>
  )
}

Appbar.propTypes = {
  open: PropTypes.bool,
  drawerWidth: PropTypes.number,
  setOpen: PropTypes.func
}

export default Appbar