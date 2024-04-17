/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react'
import { Box, Modal } from '@mui/material'
import { Button } from '@/components/shared'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { useRouter } from 'next/router'
import { primaryButtonStyle } from '@/utils/theme'
import { mapStateToProps } from '@/store/'
import { ERROR_ICON, SUCCESS_ICON } from '@/utils/iconConstant'

const style = {
  position: 'absolute',
  textAlign: 'center',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '100%',
  maxWidth: '600px',
  bgcolor: 'background.paper',
  //   border: '2px solid #abaaa9',
  // boxShadow: 24,
  border: 'none',
  p: 4,
  borderRadius: '20px'
}

function ModalResponse({
  modalReducer,
  closeModal = () => { }
}) {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const path = router.asPath
  useEffect(() => {
    setOpen(modalReducer?.modal)
  }, [modalReducer?.modal])

  const handleCallback = () => {
    router.push(modalReducer?.redirect || path)
    closeModal()
  }



  return (
    <div>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        open={open}
      // {...(modalReducer?.redirect === null && { onClose: closeModal })}
      >
        <Box sx={style}>
          {
            modalReducer?.code === 200 && (
              <>
                <img
                  style={{
                    width: '100%',
                    height: 'auto',
                    maxWidth: '128px'
                  }}
                  src={SUCCESS_ICON}
                  alt='success'
                />
                <h2>
                  {modalReducer?.message}
                </h2>
                <div
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
                    color='warning'
                    sx={{
                      padding: '12px',
                      width: '540px',
                      textTransform: 'none',
                      ...primaryButtonStyle
                    }}
                    onClick={() => { handleCallback() }}
                  />
                </div>
              </>
            )
          }
          {
            modalReducer?.code !== 200 && modalReducer?.code !== 201 && (
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
                <h2>
                  {modalReducer?.message}
                </h2>
                <p style={{
                  marginTop: '10px'
                }}>{modalReducer?.childMessage}</p>
                <Button
                  text='Tutup'
                  type='button'
                  color='warning'
                  sx={{
                    padding: '12px',
                    width: '440px',
                    textTransform: 'none',
                    ...primaryButtonStyle,
                    textTransform: 'none'
                  }}
                  onClick={() => { handleCallback() }}
                />
              </>
            )
          }
        </Box>
      </Modal>

    </div >
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