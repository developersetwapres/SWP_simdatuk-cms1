import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import NewCouponList from './NewCouponList'
import NewCouponSubmissionToolbar from './NewCouponSubmissionToolbar'
import CouponSubmissionApprove from './modal/CouponSubmissionApprove'
import CouponSubmissionReject from './modal/CouponSubmissionReject'

function NewCouponSubmission({
  queries,
  command,
  exportExcel,
  couponSubmission,
  onSearch = () => { },
  onPaginationChange = () => { },
  onDate = () => { },
  onPosition = () => { },
  onLevel = () => { },
  onBlacklist = () => { },
  onStatus = () => { },
  rejectCouponSubmissionList = () => { },
  approveCouponSubmissionList = () => { },
  onClearState = () => { },
  getCommandFilterCouponSubmission = () => { },
  exportReportCoupon = () => { }
}) {
  const [approveModal, setApproveModal] = useState(false)
  const [rejectModal, setRejectModal] = useState(false)
  const [id, setId] = useState('')

  const handleRejectModal = (id) => {
    setRejectModal(true)
    setId(id)
  }

  const handleApproveModal = (val) => {
    setApproveModal(true)
    setId(val.id)
    const payload = {
      provider_id: val.provider.id
    }
    getCommandFilterCouponSubmission(payload)
  }

  return (
    <Fragment>
      <NewCouponSubmissionToolbar
        queries={queries}
        exportExcel={exportExcel}
        onSearch={onSearch}
        onDate={onDate}
        onPosition={onPosition}
        command={command}
        onLevel={onLevel}
        onBlacklist={onBlacklist}
        onStatus={onStatus}
        onClearState={onClearState}
        exportReportCoupon={exportReportCoupon}
      />
      <NewCouponList
        items={couponSubmission?.couponSubmission}
        onPaginationChange={onPaginationChange}
        pagination={couponSubmission?.pagination}
        loading={couponSubmission?.loading}
        handleRejectModal={handleRejectModal}
        handleApproveModal={handleApproveModal}
        resetPagination={queries?.page}
      />
      {/* Approve Modal */}
      <CouponSubmissionApprove
        couponSubmission={couponSubmission}
        approveModal={approveModal}
        setApproveModal={setApproveModal}
        id={id}
        command={command}
        approveCouponSubmissionList={approveCouponSubmissionList}
      />
      {/* End Approve Modal
      {/* Reject Modal */}
      <CouponSubmissionReject
        couponSubmission={couponSubmission}
        rejectModal={rejectModal}
        setRejectModal={setRejectModal}
        id={id}
        rejectCouponSubmissionList={rejectCouponSubmissionList}
      />
      {/* End Reject Modal */}
    </Fragment>
  )
}

NewCouponSubmission.propTypes = {
  queries: PropTypes.object,
  command: PropTypes.object,
  exportExcel: PropTypes.object,
  couponSubmission: PropTypes.object,
  onPaginationChange: PropTypes.func,
  onSearch: PropTypes.func,
  onDate: PropTypes.func,
  onPosition: PropTypes.func,
  onLevel: PropTypes.func,
  onBlacklist: PropTypes.func,
  onStatus: PropTypes.func,
  rejectCouponSubmissionList: PropTypes.func,
  approveCouponSubmissionList: PropTypes.func,
  onClearState: PropTypes.func,
  getCommandFilterCouponSubmission: PropTypes.func,
  exportReportCoupon: PropTypes.func
}

export default NewCouponSubmission