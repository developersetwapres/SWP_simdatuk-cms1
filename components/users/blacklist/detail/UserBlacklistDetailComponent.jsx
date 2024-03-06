/* eslint-disable @next/next/no-img-element */
import { Button, ModalConfirm } from '@/components/shared'
import { primaryButtonStyle } from '@/utils/theme'
import { Box } from '@mui/material'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import UserBlacklistDetailForm from './UserBlacklistDetailForm'


function UserBlacklistDetailComponent({
  blacklist,
  command,
  openBlacklistUser = () => { }
}) {
  const [blacklistModal, setBlacklistModal] = useState(false)


  const handleBlacklistModal = () => {
    setBlacklistModal(true)
  }


  const handleBlacklist = () => {
    const payload = {
      blacklist: false
    }
    openBlacklistUser(blacklist?.detail?.id, payload)
    setBlacklistModal(false)
  }

  const handleCancelModal = () => {
    setBlacklistModal(false)
  }

  return (
    <>
      <h3>Detail Pengguna</h3>
      <UserBlacklistDetailForm
        detail={blacklist?.detail}
        command={command}
      />
      <Button
        text='Buka Blacklist'
        sx={{
          textTransform: 'none',
          marginTop: '20px',
          ...primaryButtonStyle
        }}
        color='warning'
        onClick={handleBlacklistModal}
      />
      {/* Modal Confirm */}
      <ModalConfirm
        open={blacklistModal}
        width='650px'
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
        }}>Apakah anda yakin akan membuka Blacklist ?</p>
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
            isBusy={blacklist?.isSubmit}
            isLoading={blacklist?.loading}
            onClick={() => { handleBlacklist() }}
          />
          <Button
            text='Tidak'
            sx={{
              width: '100%',
              maxWidth: '240px',
              textTransform: 'none'
            }}
            onClick={handleCancelModal}
          />
        </Box>
      </ModalConfirm>
    </>
  )
}

UserBlacklistDetailComponent.propTypes = {
  blacklist: PropTypes.object,
  command: PropTypes.object,
  openBlacklistUser: PropTypes.func
}

export default UserBlacklistDetailComponent