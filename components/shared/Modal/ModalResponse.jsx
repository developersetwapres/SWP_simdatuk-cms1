/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react'
import { Box, Modal, Typography } from '@mui/material'
import { Button } from '@/components/shared'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { useRouter } from 'next/router'
import { primaryButtonStyle } from '@/utils/theme'
import { mapStateToProps } from '@/store/'
import { ERROR_ICON, SUCCESS_ICON } from '@/utils/iconConstant'

const style = {
  width: '100%',
  maxWidth: '640px',
  padding: '50px 40px 34px 40px',
  position: 'absolute',
  textAlign: 'center',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: 'none',
  borderRadius: '20px'
}

function ModalResponse({ modalReducer, closeModal = () => {} }) {
  const router = useRouter()
  const path = router.asPath

  const [open, setOpen] = useState(false)

  const handleCallback = () => {
    if (modalReducer?.redirect) router.push(modalReducer?.redirect || path)
    closeModal()
  }

  useEffect(() => {
    setOpen(modalReducer?.modal)

    console.log('modalReducer', modalReducer)
  }, [modalReducer, modalReducer?.modal])

  return (
    <Modal
      aria-labelledby='transition-modal-title'
      aria-describedby='transition-modal-description'
      open={open}
      // {...(modalReducer?.redirect === null && { onClose: closeModal })}
    >
      <Box sx={style}>
        {modalReducer?.code === 200 && (
          <>
            <Box
              sx={{
                margin: 'auto',
                height: '112px',
                width: '112px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden'
              }}
            >
              <img
                style={{
                  width: '100%',
                  height: 'auto',
                  maxWidth: '128px'
                }}
                src={SUCCESS_ICON}
                alt='success'
              />
            </Box>
            <Box sx={{ margin: '24px auto 30px auto' }}>
              {modalReducer?.message && (
                <Typography
                  sx={{
                    fontSize: '26px',
                    fontWeight: 800
                  }}
                >
                  {modalReducer?.message}
                </Typography>
              )}
              {modalReducer?.childMessage && (
                <Typography
                  sx={{
                    fontSize: '16px',
                    fontWeight: 400
                  }}
                >
                  {modalReducer?.childMessage}
                </Typography>
              )}
            </Box>
            <Box
              style={{
                marginRight: 'auto',
                marginLeft: 'auto',
                width: '100%',
                textAlign: 'center'
              }}
            >
              <Button
                text='Tutup'
                type='button'
                sx={{
                  padding: '12px',
                  width: '100%',
                  textTransform: 'none',
                  ...primaryButtonStyle
                }}
                onClick={() => {
                  handleCallback()
                }}
              />
            </Box>
          </>
        )}
        {modalReducer?.code !== 200 && modalReducer?.code !== 201 && (
          <>
            <img
              src={ERROR_ICON}
              style={{
                width: '100%',
                height: 'auto',
                maxWidth: '128px'
              }}
              alt='error'
            />
            <h2>{modalReducer?.message}</h2>
            <p
              style={{
                marginTop: '10px'
              }}
            >
              {modalReducer?.childMessage}
            </p>
            <Button
              text='Tutup'
              type='button'
              sx={{
                padding: '12px',
                width: '440px',
                textTransform: 'none',
                ...primaryButtonStyle,
                textTransform: 'none'
              }}
              onClick={() => {
                handleCallback()
              }}
            />
          </>
        )}
      </Box>
    </Modal>
  )
}

ModalResponse.propTypes = {
  modalReducer: PropTypes.object,
  closeModal: PropTypes.func
}

const mapDispatchToProps = (dispatch) => {
  return {
    closeModal: () => dispatch({ type: 'CLOSE_MODAL' })
  }
}

export default connect(
  mapStateToProps('modalReducer'),
  mapDispatchToProps
)(ModalResponse)
