import React, { useState } from 'react'
import CouponSubmissionDetailToolbar from './CouponSubmissionDetailToolbar'
import CouponSubmissionDetailForm from './CouponSubmissionDetailForm'
import PropTypes from 'prop-types'
import RejectModal from './modal/RejectModal'
import ApproveModal from './modal/ApproveModal'

function CouponSubmissionDetailComponent({
  command,
  couponSubmission,
  rejectCouponSubmission = () => { },
  approveCouponSubmission = () => { },
  getCommandFilterCouponSubmission = () => { }
}) {

  const [modalReject, setModalReject] = useState(false)
  const [modalApprove, setModalApprove] = useState(false)
  /**
   * Handle Modal Reject
   * params will recieved status open and close
   * @param {*} status
   */
  const handleModalReject = (status) => {
    if (typeof status === 'string') {
      if (status === 'open') {
        setModalReject(true)
      } else {
        setModalReject(false)
      }
    }
  }

  const handleModalApprove = (status) => {
    if (typeof status === 'string') {
      if (status === 'open') {
        setModalApprove(true)
      } else {
        setModalApprove(false)
      }
    }
  }

  return (
    <>
      <h3>Detail Pengajuan Kupon</h3>
      <CouponSubmissionDetailForm
        detailCoupon={couponSubmission?.detail}
        command={command}
      />
      <CouponSubmissionDetailToolbar
        coupon={couponSubmission?.detail}
        handleModalReject={handleModalReject}
        handleModalApprove={handleModalApprove}
        getCommandFilterCouponSubmission={getCommandFilterCouponSubmission}
      />
      <RejectModal
        rejectCouponSubmission={rejectCouponSubmission}
        modal={modalReject}
        handleModalReject={handleModalReject}
        couponSubmission={couponSubmission}
        setModalReject={setModalReject}
      />
      <ApproveModal
        modal={modalApprove}
        approveCouponSubmission={approveCouponSubmission}
        command={command}
        handleModalApprove={handleModalApprove}
        couponSubmission={couponSubmission}
        setModalApprove={setModalApprove}
      />
    </>
  )
}

CouponSubmissionDetailComponent.propTypes = {
  command: PropTypes.object,
  couponSubmission: PropTypes.object,
  rejectCouponSubmission: PropTypes.func,
  approveCouponSubmission: PropTypes.func,
  getCommandFilterCouponSubmission: PropTypes.func
}

export default CouponSubmissionDetailComponent
