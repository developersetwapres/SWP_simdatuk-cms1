/* eslint-disable @next/next/no-img-element */
import { Button, ModalConfirm } from '@/components/shared'
import { blackButtonStyle, dangerButtonStyle, primaryButtonStyle } from '@/utils/theme'
import { Box, Grid } from '@mui/material'
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'

function CouponDetailToolbar({
  couponId,
  deleteCoupon = () => { }
}) {
  const router = useRouter()
  const [modalDelete, setModalDelete] = useState(false)
  const [id, setId] = useState('')

  const handleDeleteConfirm = (id) => {
    setModalDelete(true)
    setId(id)
  }

  const handleDeleteCoupon = () => {
    deleteCoupon(id)
    setModalDelete(false)
  }

  const handleCancelModal = () => {
    setModalDelete(false)
  }
  return (
    <Grid
      container
      spacing={2}
      direction='row'
    >
      <Grid
        item
      >
        <Button
          text='Edit'
          sx={{
            textTransform: 'none',
            ...primaryButtonStyle
          }}
          color='warning'
          onClick={() => router.push(`/manajemen-kupon/kupon/update/${couponId}`)}
        />
      </Grid>
      <Grid
        item
      >
        <Button
          text='Hapus'
          sx={{
            textTransform: 'none',
            ...dangerButtonStyle
          }}
          color='danger'
          onClick={() => { handleDeleteConfirm(couponId) }}
        />
      </Grid>
      <ModalConfirm
        open={modalDelete}
      >
        <img
          src='/images/information-circle.png'
          alt='logo'
          style={{
            width: '100%',
            maxWidth: '160px',
            height: '160px',
            display: 'block',
            margin: '0 auto'
          }}
        />
        <p style={{
          fontWeight: 'bold',
          textAlign: 'center',
          fontSize: '22px',
          marginTop: '30px'
        }}>Apakah anda yakin akan menghapus Pengguna ?</p>
        <Box
          component='div'
          sx={{
            display: 'flex',
            alignItems: 'center',
            // flexWrap: 'nowrap',
            flexDirection: {
              xl: 'row',
              lg: 'row',
              md: 'column',
              sm: 'column',
              xs: 'column'
            },
            justifyContent: 'space-evenly'
          }}
        >
          <Button
            text='Ya'
            color='warning'
            onClick={() => { handleDeleteCoupon() }}
            sx={{
              width: '100%',
              maxWidth: '240px',
              textTransform: 'none',
              marginBottom: {
                xl: 0,
                lg: 0,
                md: '10px',
                sm: '10px',
                xs: '10px'
              },
              ...primaryButtonStyle
            }}
          />
          <Button
            text='Tidak'
            sx={{
              width: '100%',
              maxWidth: '240px',
              textTransform: 'none',
              ...blackButtonStyle
            }}
            onClick={handleCancelModal}
          />
        </Box>
      </ModalConfirm>
    </Grid>
  )
}

CouponDetailToolbar.propTypes = {
  couponId: PropTypes.number,
  deleteCoupon: PropTypes.func
}

export default CouponDetailToolbar