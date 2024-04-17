import React from 'react'
import PropTypes from 'prop-types'
import { Modal } from '..'
import { Box, Grid, IconButton, Typography } from '@mui/material'
import { Close } from '@mui/icons-material'
import CardListJobs from '../Card/CardListJobs'

const style = {
  card: {
    width: '100%',
    minHeight: '440px',
    boxShadow: 'none',
    border: '1px solid #394346',
    borderRadius: '10px'
  },
  containerModal: {
    paddingBottom: '32px',
    minHeight: '320px',
    background: '#F6EBDA',
    position: 'relative'
  },
  containerHeader: {
    marginBottom: '20px'
  },
  containerEmployee: {
    maxHeight: '574px',
    overflowY: 'auto'
  }
}

const ModalJobs = ({ data, isModal, handleModal }) => {
  return (
    <Modal
      aria-labelledby='transition-modal-title'
      aria-describedby='transition-modal-description'
      open={isModal}
      onClose={handleModal}
      padding='2rem'
      width={'1050px'}
      otherStyle={style?.containerModal}
    >
      <Box sx={style?.containerHeader}>
        <Typography
          variant='h6'
          textAlign='center'
          fontWeight='600'
          sx={{ marginTop: '8px' }}
        >
          {data?.title || 'Jabatan Fungsional'}
        </Typography>
        <IconButton
          onClick={handleModal}
          style={{
            cursor: 'pointer',
            position: 'absolute',
            top: 30,
            right: 30
          }}
        >
          <Close style={{ fontSize: '24px', fontWeight: 800 }} />
        </IconButton>
      </Box>
      <Grid container spacing={3}>
        {data?.children.map((item, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <CardListJobs
              data={item}
              handleModal={handleModal}
              otherStyle={{ height: '200px', padding: '14px 20px' }}
            />
          </Grid>
        ))}
      </Grid>
    </Modal>
  )
}

ModalJobs.propTypes = {
  isModal: PropTypes.bool,
  handleModal: PropTypes.func,
  data: PropTypes.any
}

export default ModalJobs
