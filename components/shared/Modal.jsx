import React from 'react'
import PropTypes from 'prop-types'
import { Modal as MuiModal, Box } from '@mui/material'

function Modal({
  open,
  width = '600px',
  children,
  otherStyle,
  ...others
}) {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    maxWidth: width,
    bgcolor: 'background.paper',
    border: 'none',
    // boxShadow: 24,
    px: 4,
    py: 3,
    borderRadius: '20px',
    outline: 'none'
  }

  const handleClose = () => {
    openModal(false)
  }

  return (
    <MuiModal
      keepMounted
      open={open}
      onClose={handleClose}
      {...others}
    >
      <Box
        sx={style}
        style={otherStyle}
      >
        {children}
      </Box>
    </MuiModal>
  )
}

Modal.propTypes = {
  open: PropTypes.bool,
  openModal: PropTypes.func,
  width: PropTypes.string,
  padding: PropTypes.string,
  children: PropTypes.node,
  otherStyle: PropTypes.object
}

export default Modal