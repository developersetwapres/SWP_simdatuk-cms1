/* eslint-disable @next/next/no-img-element */
import React, { Fragment, useState } from 'react'
import Footer from '@/components/core/Footer'
import { Box, Container, List, Toolbar, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import Appbar from '@/components/core/Appbar'
import PropTypes from 'prop-types'
import navigation from '@/components/core/navigation'
import Drawer from '@/components/core/Drawer'
import BackdropPage from './BackdropPage'
import SidebarItem from './sidebar/SidebarItem'
import Image from 'next/image'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  toolbar: {
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
    height: 'calc(100vh - 64px)',
    marginTop: '64px',
    backgroundColor:
      theme.palette.mode === 'light'
        ? theme.palette.grey[100]
        : theme.palette.grey[900],
    flexGrow: 1,
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
  footer: {
    paddingTop: '2.5rem',
    paddingBottom: '2.5rem',
    alignSelf: 'flex-end'
  },
  activeRoute: {
    backgroundColor: '#FE9516 !important',
    padding: '12px 4px',
    maxWidth: '300px'
  },
  boxToolbar: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'center'
  },
  inputParent: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    border: '1px solid #878787',
    margin: '1rem',
    borderRadius: '4px'
  },
  input: {
    cursor: 'text',
    caretColor: '#fff',
    color: '#fff',
    border: 'none',
    borderRight: '1px solid #fff',
    width: '100%',
    padding: '10px 14px',
    backgroundColor: 'transparent',
    fontSize: '16px',
    '&:focus': {
      outline: 'none',
      borderRight: '1px solid #fff'
    }
  }
}))

function Layout({ children, window, willRender }) {
  const classes = useStyles()
  const [mobile, setMobile] = useState(false)
  // const [toggleOpen, setToggleOpen] = useState([])
  const handleMobile = () => {
    setMobile(!mobile)
  }

  // eslint-disable-next-line no-unused-vars
  const handleToggleOpen = (e, index) => {
    setToggleOpen({ [e]: !toggleOpen[e] })
  }

  const container =
    window !== undefined ? () => window().document.body : undefined

  const drawer = (
    <Fragment>
      <Toolbar disableGutters className={classes.toolbar}>
        <Box component='div' className={classes.boxToolbar}>
          <Image
            src='/simdatuk/Logo.png'
            alt='logo'
            width={50}
            height={50}
            style={{
              maxWidth: '225px'
            }}
          />
          <Typography
            variant='h5'
            component='h5'
            fontSize='24px'
            fontWeight='600'
            lineHeight='32px'
          >
            SIMDATUK
          </Typography>
        </Box>
      </Toolbar>
      <Toolbar disableGutters className={classes.toolbar}>
        <Box component='div' className={classes.boxToolbar}>
          <Box
            width={50}
            height={50}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              overflow: 'hidden',
              backgroundColor: '#fff'
            }}
          >
            <Image
              src='/simdatuk/profile.png'
              alt='logo'
              width={50}
              height={50}
            />
          </Box>
          <Box>
            <Typography
              variant='h6'
              component='p'
              fontSize='16px'
              fontWeight='600'
            >
              Sabio Ekuator
            </Typography>
            <Typography variant='p' component='p'>
              Administrator
            </Typography>
          </Box>
        </Box>
      </Toolbar>
      <List>
        {navigation.map((item, index) => (
          <SidebarItem
            name={item.name}
            icon={item.icon}
            child={item.children}
            path={item.path}
            key={index}
          />
        ))}
      </List>
    </Fragment>
  )

  return (
    <Box className={classes.root}>
      {/* Appbar Component */}
      <Appbar open={mobile} setOpen={handleMobile} drawerWidth={260} />
      {/* Drawer Component */}
      <Drawer
        open={mobile}
        container={container}
        drawerWidth={260}
        setOpen={handleMobile}
        drawer={drawer}
      />
      <Box component='main' className={classes.main}>
        <Container
          maxWidth='xl'
          sx={{
            minHeight: '720px',
            padding: '35px'
          }}
        >
          <Box
            elevation='0'
            sx={{
              backgroundColor: '#f4f4f4',
              paddding: '0 '
            }}
          >
            {!willRender && <BackdropPage open={true} />}
            {children}
          </Box>
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
