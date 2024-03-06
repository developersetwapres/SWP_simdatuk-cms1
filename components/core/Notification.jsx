import React, { Fragment, useState } from 'react'
import { Box, Button, CircularProgress, Divider, Grid, Menu } from '@mui/material'
import { BELL_WHITE } from '@/utils/iconConstant'
import { Icon } from '../shared'
import { makeStyles } from '@mui/styles'
import { BELL_ICON } from '@/utils/iconConstant'
import { NOTIFICATION_ICON_WARNING } from '@/utils/iconConstant'
import { useDispatch, useSelector } from 'react-redux'
import { GET_NOTIFICATION_REQUESTED } from '@/store/constants'

const useStyles = makeStyles((theme) => ({
  notification: {
    marginTop: '20px',
    height: '380px',
    overflow: 'scroll'
  },
  notFoundNotification: {
    textAlign: 'center',
    padding: '20px'
  },
  bellIcon: {
    marginRight: '-30px',
    [theme.breakpoints.down('sm')]: {
      marginRight: ' -30px'
    }
  }
}))

function Notification() {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const classes = useStyles()
  const selector = useSelector((state) => state.command)
  const dispatch = useDispatch()

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
    dispatch({ type: GET_NOTIFICATION_REQUESTED })
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Fragment>
      <Button
        id='bell-button'
        aria-controls={open ? 'bell-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <Icon
          path={BELL_WHITE}
          maxWidth={25}
          classes={classes.bellIcon}
        />
      </Button>
      <Menu
        id='bell-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'bell-button'
        }}
        sx={{
          '.MuiMenu-paper': {
            width: '350px',
            boxShadow: '0px 0px 8px rgba(103, 88, 88, 0.25)',
            borderRadius: '8px',
            padding: '10px 20px',
            left: {
              xs: 'auto',
              sm: 'auto',
              md: '985px !important',
              lg: '985px !important',
              xl: '985px !important'
            }
          },
          '.MuiMenu-list': {
            padding: 0
          }
          // height: '100%'
          // maxHeight: '488px'
        }}
      >

        <div style={{
          marginBottom: '20px'
        }}>
          <p style={{
            fontSize: '20px',
            fontWeight: '500',
            color: '#2F2F2F'
          }}>Notifikasi</p>
        </div>
        <div className={classes.notification}>
          {
            selector.loading === true ? (
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <CircularProgress />
              </div>
            ) : (
              selector.notification?.length > 0 ? (
                <Grid
                  container
                  direction='column'
                >
                  {
                    selector.notification.map((val, index) => (
                      <Grid
                        item
                        key={index}
                        sx={{
                          marginBottom: '20px'
                        }}
                      >
                        <Box
                          component='div'
                          sx={{
                            display: 'flex',
                            alignItems: 'center'
                          }}
                        >
                          <div style={{
                            width: '20%'
                          }}>
                            <Icon
                              path={NOTIFICATION_ICON_WARNING}
                              maxWidth={32}
                            />
                          </div>
                          <div style={{
                            width: '78%'
                          }}>
                            <h6 style={{
                              fontSize: '16px',
                              fontWeight: '500',
                              margin: '0'
                            }}>{val.title}</h6>
                            <p style={{
                              margin: '0',
                              fontSize: '12px',
                              color: '#878787'
                            }}>{val.created_at}</p>
                            <p style={{
                              margin: 0,
                              fontWeight: '400',
                              fontSize: '13px',
                              color: '#444444'
                            }}>{val.description}</p>
                          </div>
                        </Box>
                        <Divider
                          sx={{
                            border: '.5px solid #000',
                            marginTop: '10px'
                          }}
                        />
                      </Grid>
                    ))
                  }
                </Grid>
              ) : (
                <div className={classes.notFoundNotification}>
                  <Icon
                    path={BELL_ICON}
                    maxWidth={40}
                  />
                  <p style={{
                    color: '#BABABA'
                  }}>Tidak ada notifikasi terbaru</p>
                </div>
              )
            )

          }
        </div>
      </Menu>
    </Fragment >
  )
}

export default Notification