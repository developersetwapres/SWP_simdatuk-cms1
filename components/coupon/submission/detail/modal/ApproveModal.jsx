import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Autocomplete, Button, Icon, Modal } from '@/components/shared'
import { CLOSE_ICON_WARNING } from '@/utils/iconConstant'
import { primaryButtonStyle } from '@/utils/theme'
import { useForm } from '@/hooks/index'

function ApproveModal({
  modal,
  command,
  couponSubmission,
  handleModalApprove = () => { },
  approveCouponSubmission = () => { },
  setModalApprove = () => { }
}) {

  // eslint-disable-next-line no-unused-vars
  const [initialValues, setInitialValues] = useState({
    coupon: ''
  })

  const validate = (fieldOfValues = values) => {
    const temp = { ...errors }

    if ('coupon' in fieldOfValues)
      temp.coupon = fieldOfValues.coupon ? '' : 'Kupon tidak boleh kosong'

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
        status: 1,
        coupon_id: values.coupon.id,
        id: couponSubmission?.detail?.id
      }
      approveCouponSubmission(payload)
      setModalApprove(false)
    }
  }

  return (
    <Modal
      open={modal}
      onClose={() => handleModalApprove('')}
    >
      <div style={{
        position: 'relative'
      }}>
        <div
          onClick={() => handleModalApprove('')}
          style={{
            position: 'absolute',
            top: '-90px',
            right: '0',
            cursor: 'pointer'
          }}
        >
          <Icon
            path={CLOSE_ICON_WARNING}
            maxWidth={40}
          />
        </div>
        <h2 style={{
          textAlign: 'center'
        }}>Kupon</h2>
        <Autocomplete
          options={command?.couponSubmissionFilter}
          placeholder='Pilih Kupon'
          name='coupon'
          value={values.coupon}
          onChange={handleInputChange}
          error={errors.coupon}
        />
        <Button
          text='Submit'
          color='warning'
          sx={{
            textTransform: 'none',
            marginTop: '30px',
            ...primaryButtonStyle
          }}
          fullWidth
          onClick={handleSubmit}
        />
      </div>
    </Modal>
  )
}

ApproveModal.propTypes = {
  modal: PropTypes.bool,
  command: PropTypes.object,
  couponSubmission: PropTypes.object,
  handleModalApprove: PropTypes.func,
  approveCouponSubmission: PropTypes.func,
  setModalApprove: PropTypes.func
}

export default ApproveModal