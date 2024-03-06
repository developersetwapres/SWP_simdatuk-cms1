import React, { useState } from 'react'
import Layout from '@/components/core/Layout'
import PropTypes from 'prop-types'
import CouponSubmissionListComponent from './CouponSubmissionListComponent'
import CouponSubmissionToolbar from './CouponSubmissionToolbar'
import CouponSubmissionApprove from './modal/CouponSubmissionApprove'
import CouponSubmissionReject from './modal/CouponSubmissionReject'

function CouponSubmissionComponent({
  couponSubmission,
  command,
  onSearch = () => { },
  onBlacklist = () => { },
  onLevel = () => { },
  onStatus = () => { },
  rejectCouponSubmissionList = () => { },
  approveCouponSubmission = () => { },
  onPaginationChange = () => { },
  onDateRange = () => { }
}) {
  const [approveModal, setApproveModal] = useState(false)
  const [rejectModal, setRejectModal] = useState(false)
  const [id, setId] = useState('')

  const handleRejectModal = (id) => {
    setRejectModal(true)
    setId(id)
  }

  const handleApproveModal = (id) => {
    setApproveModal(true)
    setId(id)
  }

  return (
    <Layout>
      <CouponSubmissionToolbar
        onSearch={onSearch}
        onBlacklist={onBlacklist}
        onLevel={onLevel}
        onStatus={onStatus}
        command={command}
        onDateRange={onDateRange}
      />
      <CouponSubmissionListComponent
        items={couponSubmission?.couponSubmission}
        pagination={couponSubmission?.pagination}
        handleRejectModal={handleRejectModal}
        handleApproveModal={handleApproveModal}
        loading={couponSubmission?.loading}
        onPaginationChange={onPaginationChange}
      />
      {/* Approve Modal */}
      <CouponSubmissionApprove
        approveModal={approveModal}
        setApproveModal={setApproveModal}
        id={id}
        command={command}
        approveCouponSubmission={approveCouponSubmission}
      />
      {/* End Approve Modal
      {/* Reject Modal */}
      <CouponSubmissionReject
        rejectModal={rejectModal}
        setRejectModal={setRejectModal}
        id={id}
        rejectCouponSubmissionList={rejectCouponSubmissionList}
      />
      {/* End Reject Modal */}
    </Layout>
  )
}

CouponSubmissionComponent.propTypes = {
  couponSubmission: PropTypes.object,
  command: PropTypes.object,
  queries: PropTypes.object,
  onSearch: PropTypes.func,
  onStatus: PropTypes.func,
  onBlacklist: PropTypes.func,
  onLevel: PropTypes.func,
  rejectCouponSubmissionList: PropTypes.func,
  approveCouponSubmission: PropTypes.func,
  onPaginationChange: PropTypes.func,
  onDateRange: PropTypes.func
}

export default CouponSubmissionComponent