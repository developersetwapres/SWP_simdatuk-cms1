/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react'
import { Button, ModalConfirm } from '@/components/shared'
import { primaryButtonStyle, dangerButtonStyle, blackButtonStyle } from '@/utils/theme'
import { Box, Grid } from '@mui/material'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'

function BannerDetailToolbar({
  idBanner,
  bannerLoading,
  deleteBanner = () => { }
}) {
  const router = useRouter()

  const [modalDelete, setModalDelete] = useState(false)
  const [id, setId] = useState('')

  const handleDeleteConfirm = (id) => {
    setModalDelete(true)
    setId(id)
  }

  const handleDelete = async () => {
    await deleteBanner(id)
    setModalDelete(false)
  }

  const handleCancelModal = () => {
    setModalDelete(false)
  }
  return (
    <Grid Grid
      container
      spacing={2}
      sx={{
        marginTop: '20px'
      }}
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
          onClick={() => router.push(`/banner/update/${idBanner}`)}
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
          onClick={() => { handleDeleteConfirm(idBanner) }}
        />
      </Grid>
      {/* Start Modal */}
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
        }}>Apakah anda yakin akan menghapus Banner ?</p>
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
            onClick={() => { handleDelete() }}
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
            isBusy={bannerLoading?.isSubmit}
            isLoading={bannerLoading?.loading}
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
    </Grid >
  )
}

BannerDetailToolbar.propTypes = {
  idBanner: PropTypes.number,
  bannerLoading: PropTypes.object,
  deleteBanner: PropTypes.func
}

export default BannerDetailToolbar