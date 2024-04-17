import React from 'react'
import PropTypes from 'prop-types'
import { Modal } from '..'
import { Box, Grid, IconButton, Typography } from '@mui/material'
import CardProfile from '../Card/CardProfile'
import { Close } from '@mui/icons-material'

const style = {
  card: {
    width: '100%',
    minHeight: '440px',
    boxShadow: 'none',
    border: '1px solid #394346',
    borderRadius: '10px'
  },
  containerModal: {
    minHeight: '460px',
    padding: '28px 36px',
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

const ModalEmployee = ({ data, isModal, handleModal }) => {
  return (
    <Modal
      aria-labelledby='transition-modal-title'
      aria-describedby='transition-modal-description'
      open={isModal}
      onClose={handleModal}
      padding='2rem'
      width={'1040px'}
      otherStyle={style?.containerModal}
    >
      <Box sx={style?.containerHeader}>
        <Typography
          variant='h6'
          textAlign='center'
          fontWeight='600'
          sx={{ height: '26px' }}
        >
          {data?.position || '-'}
        </Typography>
        <Typography variant='h6' textAlign='center' fontWeight='600'>
          {`(${data?.children?.length}/${data?.slot})`}
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
      <Grid
        container
        gap={3}
        sx={style?.containerEmployee}
        justifyContent={
          data?.children.length > 2 ? 'space-between' : 'flex-start'
        }
      >
        {data?.children.map((item, index) => {
          const payload = {
            ...item,
            type: data?.type,
            position: data?.position
          }

          return (
            <Grid
              item
              xs={12}
              sm={data?.children.length > 2 ? 4 : 6}
              key={index}
              sx={{
                maxWidth: {
                  md: data?.children.length > 2 ? '18vw' : '48%',
                  sm: '25vw',
                  xs: '50vw'
                }
              }}
            >
              <CardProfile rootStyle={style?.card} data={payload} isProfile />
            </Grid>
          )
        })}
      </Grid>
    </Modal>
  )
}

ModalEmployee.propTypes = {
  isModal: PropTypes.bool,
  handleModal: PropTypes.func,
  data: PropTypes.any
}

export default ModalEmployee
