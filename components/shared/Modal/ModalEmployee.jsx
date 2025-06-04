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
          {data?.name || '-'}
        </Typography>
        <Typography variant='h6' textAlign='center' fontWeight='600'>
          {`(${data?.available}/${data?.filled})`}
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
        spacing={3}
        sx={style?.containerEmployee}
        justifyContent={'flex-start'}
      >
        {data?.users.map((item, index) => {
          const payload = {
            ...data,
            position_name: null,
            available: 1,
            name: null,
            users: data?.users.filter((itm) => itm?.id == item?.id)
          }

          return (
            <Grid
              item
              xs={data?.filled > 2 ? 4 : 6}
              sx={{ position: 'relative' }}
              key={index}
            >
              <CardProfile
                isBorder={true}
                isShadow={false}
                rootStyle={style?.card}
                data={payload}
                isProfile
              />
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
