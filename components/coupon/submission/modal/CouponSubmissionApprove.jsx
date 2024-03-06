/* eslint-disable @next/next/no-img-element */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Autocomplete, Button, Icon, Modal } from '@/components/shared'
import { CLOSE_ICON_WARNING } from '@/utils/iconConstant'
import { primaryButtonStyle } from '@/utils/theme'
import { useForm } from '@/hooks/'

function CouponSubmissionApprove({
  couponSubmission,
  approveModal,
  command,
  id,
  approveCouponSubmissionList = () => { },
  setApproveModal = () => { }
}) {

  const [initialValues, setInitialValues] = useState({
    coupon: ''
  })

  const [finishModal, setFinishModal] = useState(false)

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
    resetForm,
    handleInputChange
  } = useForm(initialValues, true, validate)

  const handleApprove = () => {
    if (validate()) {
      const payload = {
        status: 1,
        coupon_id: values.coupon.id,
        id: id
      }
      approveCouponSubmissionList(payload)
      resetForm()
      setInitialValues({
        coupon: ''
      })
      setApproveModal(false)
      setFinishModal(true)
    }
  }

  return (
    <>
      <Modal
        open={approveModal}
        onClose={() => {
          setApproveModal(false)
          resetForm()
        }}
        padding='3rem 3rem'
        width='590px'
      >
        <div style={{
          position: 'relative'
        }}>
          <div
            onClick={() => {
              setApproveModal(false)
              resetForm()
            }}
            style={{
              position: 'absolute',
              top: '-45px',
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
            textAlign: 'center',
            marginBottom: '60px'
          }}>Kupon</h2>
          <Autocomplete
            options={command?.couponSubmissionFilter}
            placeholder='Pilih Kupon'
            name='coupon'
            value={values.coupon}
            onChange={handleInputChange}
          />
          <Button
            text='Submit'
            color='warning'
            sx={{
              textTransform: 'none',
              marginTop: '50px',
              ...primaryButtonStyle
            }}
            onClick={() => { handleApprove() }}
            fullWidth
          />
        </div>
      </Modal>
      {/* Modal Response */}
      <Modal
        open={finishModal}
        padding='3rem 0'
        onClose={() => {
          setFinishModal(false)
          window.location.reload()
        }}
        width='700px'
      >
        <img
          src={couponSubmission.icon}
          alt='success'
          style={{
            width: '100%',
            height: 'auto',
            maxWidth: '128px',
            display: 'block',
            margin: '0 auto'
          }}
        />
        <h2 style={{
          textAlign: 'center',
          marginBottom: '30px'
        }}>{couponSubmission.message}</h2>
        <p style={{ textAlign: 'center' }}>{couponSubmission.error}</p>
        <div style={{
          marginRight: 'auto',
          marginLeft: 'auto',
          width: '100%',
          textAlign: 'center'
        }}>
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
            onClick={() => {
              setFinishModal(false)
              window.location.reload()
            }}
          />
        </div>
      </Modal>
      {/* Modal End */}
    </>
  )
}

CouponSubmissionApprove.propTypes = {
  couponSubmission: PropTypes.object,
  approveModal: PropTypes.bool,
  command: PropTypes.object,
  id: PropTypes.number,
  approveCouponSubmissionList: PropTypes.func,
  setApproveModal: PropTypes.func
}

export default CouponSubmissionApprove