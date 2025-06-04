import * as React from 'react'
import PropTypes from 'prop-types'
import Modal from './Modal'

function ModalConfirm ({
  open,
  title,
  width = '600px',
  setClose = () => { },
  children
}) {
  const handleClose = () => {
    setClose(false)
  }
  return (
    <div>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        open={open}
        onClose={handleClose}
        padding='2rem'
        width={width}
      >
        {
          typeof title === 'string'
            ? (
              <h3
                style={{
                  textAlign: 'center'
                }}
              >
                {title}
              </h3>
            )
            : title
        }
        {children}
      </Modal>
    </div>
  )
}

ModalConfirm.propTypes = {
  open: PropTypes.bool,
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node
  ]),
  closeText: PropTypes.string,
  submitText: PropTypes.string,
  width: PropTypes.string,
  setClose: PropTypes.func,
  children: PropTypes.node
}

export default ModalConfirm
