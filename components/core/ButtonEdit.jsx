import React, { Fragment } from 'react'
import { Button } from '@mui/material'
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import PropTypes from 'prop-types'
// import { ModeEditOutline } from '@mui/icons-material'
import { Icon } from '../shared'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
  icon: {
    cursor: 'pointer',
    position: 'absolute',
    top: '70%',
    right: '1%',
    transform: 'translate(-50%, -50%)'
  }
})
function ButtonEdit() {
  // const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const classes = useStyles()

  const handleClick = () => {}

  return (
    <Fragment>
      <Button
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
          <Icon maxWidth={20} classes={classes.icon} />
          Edit
        </div>
      </Button>
    </Fragment>
  )
}

ButtonEdit.propTypes = {
  handleModalLogout: PropTypes.func
}

export default ButtonEdit
