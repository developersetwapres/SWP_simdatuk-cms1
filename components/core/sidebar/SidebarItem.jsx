/* eslint-disable indent */
import React, { useState } from 'react'
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  List
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import { onlyRole } from '@/utils/index'
import { decryptItem } from '@/utils/crypt'
import { Access, accessGranted } from '@/utils/permissionManager'

const useStyles = makeStyles({
  listItemText: {
    '& .MuiTypography-root': {
      fontSize: '14px',
      lineHeight: '19.6px'
    }
  },
  listItemButtonChildren: {
    paddingLeft: '2rem'
  },
  activeRoute: {
    backgroundColor: 'rgba(225, 225, 225, .3) !important'
  }
})

function SidebarItem({
  name,
  icon,
  child,
  path,
  role,
  handleModalLogout = () => { }
}) {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const handleOpen = (path) => {
    if (typeof path !== 'undefined') {
      menuAccess?.access?.map((v) => {
        onlyRole(v?.name, role) && router.push(path)
      })
    } else {
      setOpen(!open)
    }
  }

  const handlePageChange = (path) => {
    router.push(path)
  }

  const clickListItem = (value) => {
    handleOpen(value)

    if (value == '/logout') {
      handleModalLogout()
    } else if (value) {
      router.push(value)
    } else {
      return
    }
  }

  const menuAccess =
    decryptItem('setneg_menu', 'my-menu') !== null
      ? decryptItem('setneg_menu', 'my-menu')
      : ''

  return (
    <div
      className={`${typeof path !== 'undefined' &&
        router.pathname.split('/')[1] === path?.split('/')[1]
        ? classes.activeRoute
        : ''
        } `}
    >
      <ListItemButton
        onClick={() => clickListItem(path)}
        selected={router.pathname === path}
      >
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={name} className={classes.listItemText} />
        {typeof child !== 'undefined' &&
          (open ||
            router.pathname.split('/')[1].replace('-', ' ') ===
            name.toLowerCase() ? (
            <KeyboardArrowUp />
          ) : (
            <KeyboardArrowDown />
          ))}
      </ListItemButton>
      {typeof child !== 'undefined' && (
        <Collapse
          in={
            open ||
            router.pathname.split('/')[1].replace('-', ' ') ===
            name.toLowerCase()
          }
        >
          <List component='div' disablePadding>
            {child?.map((value, i) => {
              if (!accessGranted(value?.permissionID, Access.READ)) return null

              return (
                <ListItemButton
                  className={`${classes.listItemButtonChildren} ${router.pathname.split('/')[2] === value.path.split('/')[2]
                    ? classes.activeRoute : ''} `}
                  key={i}
                  onClick={() =>
                    handlePageChange(value.path)
                  }
                  selected={router.pathname === value.path}
                >
                  <ListItemIcon>{value.icon}</ListItemIcon>
                  <ListItemText
                    primary={value.name}
                    className={classes.listItemText}
                  />
                </ListItemButton>
              )
            })}
          </List>
        </Collapse>
      )}
    </div>
  )
}

SidebarItem.propTypes = {
  name: PropTypes.string,
  icon: PropTypes.any,
  child: PropTypes.array,
  path: PropTypes.string,
  role: PropTypes.array,
  handleModalLogout: PropTypes.func
}

export default SidebarItem
