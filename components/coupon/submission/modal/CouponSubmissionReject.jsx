/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Icon, Modal, TextArea } from '@/components/shared'
import { useForm } from '@/hooks/'
import { CLOSE_ICON_WARNING } from '@/utils/iconConstant'
import { primaryButtonStyle } from '@/utils/theme'

function CouponSubmissionReject({
  couponSubmission,
  rejectModal,
  id,
  rejectCouponSubmissionList = () => { },
  setRejectModal = () => { }
}) {
  const [initialValues, setInitialValues] = useState({
    reason: ''
  })

  const [finishModal, setFinishModal] = useState(false)

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
    resetForm,
    handleInputChange
  } = useForm(initialValues, true, validate)

  const handleReject = () => {
    if (validate()) {
      const payload = {
        status: 2,
        reason: values.reason,
        id: id
      }
      rejectCouponSubmissionList(payload)
      resetForm()
      setInitialValues({
        reason: ''
      })
      setRejectModal(false)
      setFinishModal(true)
    }
  }


  return (
    <>
      <Modal
        open={rejectModal}
        onClose={() => {
          setRejectModal(false)
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
              setRejectModal(false)
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
            textAlign: 'center'
          }}>
            Tolak Kupon
          </h2>
          <TextArea
            placeholder='Masukan Alasan'
            rows={5}
            label='Alasan'
            name='reason'
            value={values.reason}
            error={errors.reason}
            onChange={handleInputChange}
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
            onClick={() => { handleReject() }}
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

CouponSubmissionReject.propTypes = {
  couponSubmission: PropTypes.object,
  rejectModal: PropTypes.bool,
  id: PropTypes.any,
  rejectCouponSubmissionList: PropTypes.func,
  setRejectModal: PropTypes.func
}

export default CouponSubmissionReject