import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Icon, Modal, TextArea } from '@/components/shared'
import { CLOSE_ICON_WARNING } from '@/utils/iconConstant'
import { primaryButtonStyle } from '@/utils/theme'
import { makeStyles } from '@mui/styles'
import { useForm } from '@/hooks/index'


const useStyles = makeStyles({
  modalParent: {
    position: 'relative'
  },
  modalIcon: {
    position: 'absolute',
    top: '-60px',
    right: '0',
    cursor: 'pointer'
  }
})

function RejectModal({
  modal,
  couponSubmission,
  rejectCouponSubmission = () => { },
  handleModalReject = () => { },
  setModalReject = () => { }
}) {
  const classes = useStyles()

  // eslint-disable-next-line no-unused-vars
  const [initialValues, setInitialValues] = useState({
    reason: ''
  })

  const validate = (fieldOfValues = values) => {
    const temp = { ...errors }

    if ('reason' in fieldOfValues)
      temp.reason = fieldOfValues.reason ? '' : 'Alasan tidak boleh kosong'

    setErrors({
      ...temp
    })

    if (fieldOfValues === values)
      return Object.values(temp).every(x => x === '')
  }

  const {
    values,
    errors,
    setErrors,
    handleInputChange
  } = useForm(initialValues, true, validate)

  const handleSubmit = () => {
    if (validate()) {
      const payload = {
        status: 2,
        reason: values.reasonReject,
        id: couponSubmission?.detail?.id
      }
      rejectCouponSubmission(payload)
      setModalReject(false)
    }
  }

  return (
    <Modal
      open={modal}
      width='800px'
      onClose={() => handleModalReject('')}
    >
      <div
        className={classes.modalParent}
      >
        <div
          className={classes.modalIcon}
          onClick={() => handleModalReject('')}
        >
          <Icon
            path={CLOSE_ICON_WARNING}
            maxWidth={40}
          />
        </div>
        <h2 style={{
          textAlign: 'center'
          // fontFamily: 'roboto'
        }}>Tolak Kupon</h2>
        <TextArea
          placeholder='Masukan Alasan'
          rows={5}
          label='Alasan'
          name='reason'
          onChange={handleInputChange}
          value={values.reason}
          error={errors.reason}
        />
        <Button
          text='Submit'
          sx={{
            textTransform: 'none',
            marginTop: '30px',
            ...primaryButtonStyle
          }}
          color='warning'
          fullWidth
          onClick={handleSubmit}
        />
      </div>
    </Modal>
  )
}

RejectModal.propTypes = {
  modal: PropTypes.bool,
  couponSubmission: PropTypes.object,
  rejectCouponSubmission: PropTypes.func,
  handleModalReject: PropTypes.func,
  setModalReject: PropTypes.func
}

export default RejectModal