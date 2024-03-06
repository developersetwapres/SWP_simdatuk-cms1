/* eslint-disable @next/next/no-img-element */
import React, { Fragment, useState } from 'react'
import Footer from '@/components/core/Footer'
import {
  Box,
  Container,
  List,
  Toolbar,
  Typography
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import Appbar from '@/components/core/Appbar'
import PropTypes from 'prop-types'
import navigation from '@/components/core/navigation'
import Drawer from '@/components/core/Drawer'
import Paper from '@/components/shared/overrides/Paper'
import BackdropPage from './BackdropPage'
import SidebarItem from './sidebar/SidebarItem'
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  toolbar: {
    justifyContent: 'center',
    padding: '1rem'
  },
  listItemText: {
    '& .MuiTypography-root': {
      fontSize: '14px',
      lineHeight: '19.6px'
    }
  },
  listItemButtonChildren: {
    paddingLeft: '2rem'
  },
  main: {
    backgroundColor: theme.palette.mode === 'light'
      ? theme.palette.grey[100]
      : theme.palette.grey[900],
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
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
  },
  container: {
    paddingTop: '70px',
    paddingLeft: '35px !important',
    paddingRight: '35px !important'
  },
  footer: {
    paddingTop: '2.5rem',
    paddingBottom: '2.5rem'
  },
  activeRoute: {
    backgroundColor: '#FE9516 !important',
    padding: '12px 4px',
    maxWidth: '300px'
  }
}))

function Layout({
  children,
  window,
  willRender
}) {
  const classes = useStyles()
  const [mobile, setMobile] = useState(false)
  const [toggleOpen, setToggleOpen] = useState([])
  const handleMobile = () => {
    setMobile(!mobile)
  }

  // eslint-disable-next-line no-unused-vars
  const handleToggleOpen = (e, index) => {
    setToggleOpen({ [e]: !toggleOpen[e] })
  }

  const container = window !== undefined ? () => window().document.body : undefined


  // Drawer List 
  const drawer = (
    <Fragment>
      <Toolbar className={classes.toolbar}>
        <Typography
          component='h5'
          variant='h5'
        >
          <img
            src='/images/Logo_Setneg_White.svg'
            alt='logo'
            style={{
              width: '100%',
              maxWidth: '225px',
              height: '40px'
            }}
          />
        </Typography>
      </Toolbar>
      <List>
        {
          navigation.map((item, index) => (
            <SidebarItem
              name={item.name}
              icon={item.icon}
              child={item.children}
              path={item.path}
              role={item.permission}
              key={index}
            />
          ))
        }
      </List>
    </Fragment>
  )

  return (
    <Box
      className={classes.root}
    >
      {/* Appbar Component */}
      <Appbar
        open={mobile}
        setOpen={handleMobile}
        drawerWidth={240}
      />
      {/* Drawer Component */}
      <Drawer
        open={mobile}
        container={container}
        drawerWidth={260}
        setOpen={handleMobile}
        drawer={drawer}
      />
      <Box
        component='main'
        className={classes.main}
      >
        <Toolbar />
        <Container
          maxWidth='xl'
          className={classes.container}
        >
          <Paper>
            {
              willRender === false ? (
                <>
                  <BackdropPage
                    open={true}
                  />
                  {children}
                </>
              ) : (
                <>
                  {children}
                </>
              )
            }
          </Paper>
        </Container>
        <Footer className={classes.footer} />
      </Box>
    </Box>
  )
}

Layout.propTypes = {
  children: PropTypes.node,
  window: PropTypes.any,
  willRender: PropTypes.bool
}

export default Layout