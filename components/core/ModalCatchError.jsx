/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react'
import { Box, Modal } from '@mui/material'
import { Button } from '../shared'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { useRouter } from 'next/router'
import { primaryButtonStyle } from '@/utils/theme'
import { ERROR_ICON } from '@/utils/iconConstant'
import { mapStateToProps } from '@/store/index'
import { useDispatch } from 'react-redux'
// eslint-disable-next-line no-unused-vars
import { AUTHENTICATION_LOGOUT_REQUESTED } from '@/store/constants'

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

function ModalCatchError({ responserReducer, closeModal = () => {} }) {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  // eslint-disable-next-line no-unused-vars
  const dispatch = useDispatch()

  useEffect(() => {
    setOpen(responserReducer?.modal)
  }, [responserReducer?.modal])

  const handleCallback = (code) => {
    if (code === 401) {
      // dispatch({ type: AUTHENTICATION_LOGOUT_REQUESTED })
      localStorage.removeItem('setneg_token')
      localStorage.removeItem('_setneg_user')
      localStorage.removeItem('setneg_menu')
      localStorage.removeItem('setneg_notification')
      // router.push('/auth/login', )
      router.reload('/auth/login')
      closeModal()
    } else {
      router.push(responserReducer?.redirect)
      closeModal()
    }
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
          {responserReducer?.code !== 200 && responserReducer?.code !== 201 && (
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
              <h2>{responserReducer?.message}</h2>
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
                onClick={() => handleCallback(responserReducer?.code)}
              />
            </>
          )}
        </Box>
      </Modal>
    </div>
  )
}

ModalCatchError.propTypes = {
  responserReducer: PropTypes.object,
  closeModal: PropTypes.func
}

const mapDispatchToProps = (dispatch) => {
  return {
    closeModal: () => dispatch({ type: 'CLOSE_MODAL' })
  }
}

export default connect(
  mapStateToProps('responserReducer'),
  mapDispatchToProps
)(ModalCatchError)
