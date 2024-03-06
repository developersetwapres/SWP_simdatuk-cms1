/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { Box, Modal, Grid, Typography } from '@mui/material'
import Backdrop from '@mui/material/Backdrop'
import PropTypes from 'prop-types'
import { Formik } from 'formik'
import * as Yup from 'yup'
import CloseIcon from '@mui/icons-material/Close'
import { Form } from '@/components/shared/index'
import Button from '../button/Button'

const validationSchema = Yup.object({
  email: Yup.string().required('Email tidak boleh kosong').email('Email tidak valid')
})


const style = {
  openButton: {
    alignSelf: 'flex-end',
    marginTop: '15px',
    color: '#895700',
    fontSize: '14px',
    fontWeight: 'bold',
    cursor: 'pointer'
  },
  modalParent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  }
}

const AlertModal = ({ children, openModal, buttonTeks }) => {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)


  useEffect(() => {
    openModal ? setOpen(true) : ''
  },[openModal])


  return (
    <>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        sx={style.modalParent}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500
          }
        }}
      >
        <Box
          container
          sx={{
            position: 'relative',
            width: {
              xs: '70%',
              sm: '50%',
              md: '35%'
            },
            bgcolor: 'background.paper',
            borderRadius: '10px',
            border: 0,
            px: 5,
            py: 4
          }}
          spacing={5}>
          {children}
          <Box
            onClick={handleClose}
          >
            <Button text={buttonTeks} />
          </Box>
        </Box>


      </Modal >
    </>
  )
}

AlertModal.propTypes = {
  children: PropTypes.node.isRequired,
  openModal: PropTypes.bool.isRequired,
  buttonTeks: PropTypes.string.isRequired
}

export default AlertModal