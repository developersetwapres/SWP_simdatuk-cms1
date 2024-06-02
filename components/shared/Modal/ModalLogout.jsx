import React from 'react'
import PropTypes from 'prop-types'
import { Button, Modal } from '..'
import { Box, Typography } from '@mui/material'

const style = {
  containerModal: {
    padding: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',
    position: 'relative'
  },
  wrapperButton: {
    width: '100%',
    display: 'flex',
    gap: '14px'
  }
}

const ModalLogout = ({
  open,
  handleModal = () => {},
  handleLogout = () => {}
}) => {
  return (
    <Modal
      aria-labelledby='transition-modal-title'
      aria-describedby='transition-modal-description'
      open={open}
      padding='2rem'
      width={'600px'}
      otherStyle={style?.containerModal}
    >
      <Typography
        sx={{
          width: '70%',
          margin: '10px 0 34px 0',
          fontSize: '20px',
          fontWeight: 600,
          textAlign: 'center',
          textTransform: 'uppercase'
        }}
      >
        Apakah anda yakin untuk keluar dari Dashboard SIMDATUK ?
      </Typography>
      <Box sx={style?.wrapperButton}>
        <Button text='Ya' style={{ width: '100%' }} onClick={handleLogout} />
        <Button
          text='Tidak'
          variant={'outlined'}
          style={{ width: '100%' }}
          onClick={handleModal}
        />
      </Box>
    </Modal>
  )
}

ModalLogout.propTypes = {
  open: PropTypes.bool,
  handleModal: PropTypes.func,
  handleLogout: PropTypes.func
}

export default ModalLogout
