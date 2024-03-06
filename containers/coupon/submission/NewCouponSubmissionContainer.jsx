import { mapActions, mapStateToProps } from '@/store/index'
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import NewCouponSubmission from '@/components/coupon/submission/NewCouponSubmission'
import Layout from '@/components/core/Layout'
import { format } from 'date-fns'

function NewCouponSubmissionContainer({
  couponSubmission,
  command,
  exportExcel,
  getCouponSubmission,
  getCommandUserPosition,
  rejectCouponSubmissionList,
  approveCouponSubmissionList,
  getCommandCoupon,
  getCommandFilterCouponSubmission,
  exportReportCoupon
}) {
  const [queries, setQueries] = useState({
    page: 1,
    limit: 10,
    sortBy: '',
    sortDesc: '',
    search: '',
    startDate: '',
    endDate: '',
    position: '',
    level: '',
    blacklist: '',
    status: ''
  })

  const [willRender, setWillRender] = useState(false)

  const onPaginationChange = (page) => {
    setQueries({
      ...queries,
      page: page
    })
  }

  const onSearch = (val) => {
    setQueries({
      ...queries,
      search: val,
      page: 1
    })
  }

  const onDate = (dates) => {
    const startHour = new Date(dates[0])
    const endHour = new Date(dates[1]).setHours(23, 59, 59, 999)
    setQueries({
      ...queries,
      startDate: format(startHour, 'yyyy-MM-dd HH:mm:ss'),
      endDate: format(endHour, 'yyyy-MM-dd HH:mm:ss'),
      page: 1
    })
  }

  const onPosition = (val) => {
    setQueries({
      ...queries,
      position: val.id,
      page: 1
    })
  }

  const onLevel = (val) => {
    setQueries({
      ...queries,
      level: val.id,
      page: 1
    })
  }

  const onBlacklist = (val) => {
    setQueries({
      ...queries,
      blacklist: val.value,
      page: 1
    })
  }

  const onStatus = (val) => {
    setQueries({
      ...queries,
      status: val.value,
      page: 1
    })
  }

  const onClearState = () => {
    setQueries({
      ...queries,
      search: '',
      startDate: '',
      position: '',
      level: '',
      blacklist: '',
      status: '',
      endDate: '',
      page: 1
    })
  }

  useEffect(() => {
    getCouponSubmission(queries)
  }, [getCouponSubmission, queries])

  useEffect(() => {
    getCommandUserPosition()
    getCommandCoupon()
  }, [getCommandUserPosition, getCommandCoupon])

  useEffect(() => {
    setTimeout(() => {
      setWillRender(true)
    }, 5000)
  }, [])

  return (
    <Layout
      willRender={willRender}
    >
      <NewCouponSubmission
        queries={queries}
        exportExcel={exportExcel}
        onPosition={onPosition}
        couponSubmission={couponSubmission}
        onPaginationChange={onPaginationChange}
        onSearch={onSearch}
        onDate={onDate}
        command={command}
        onLevel={onLevel}
        onBlacklist={onBlacklist}
        onStatus={onStatus}
        rejectCouponSubmissionList={rejectCouponSubmissionList}
        approveCouponSubmissionList={approveCouponSubmissionList}
        onClearState={onClearState}
        getCommandFilterCouponSubmission={getCommandFilterCouponSubmission}
        exportReportCoupon={exportReportCoupon}
      />
    </Layout>
  )
}

NewCouponSubmissionContainer.propTypes = {
  couponSubmission: PropTypes.object,
  command: PropTypes.object,
  exportExcel: PropTypes.object,
  getCouponSubmission: PropTypes.func,
  getCommandUserPosition: PropTypes.func,
  rejectCouponSubmissionList: PropTypes.func,
  approveCouponSubmissionList: PropTypes.func,
  getCommandCoupon: PropTypes.func,
  getCommandFilterCouponSubmission: PropTypes.func,
  exportReportCoupon: PropTypes.func
}

export default connect(
  mapStateToProps(
    'couponSubmission',
    'command',
    'exportExcel'
  ),
  mapActions(
    'getCouponSubmission',
    'getCommandUserPosition',
    'rejectCouponSubmissionList',
    'approveCouponSubmissionList',
    'getCommandCoupon',
    'getCommandFilterCouponSubmission',
    'exportReportCoupon'
  )
)(NewCouponSubmissionContainer)
