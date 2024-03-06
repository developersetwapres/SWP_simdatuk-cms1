import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { mapActions, mapStateToProps } from '@/store/index'
import { connect } from 'react-redux'
import Layout from '@/components/core/Layout'
import CouponSkeleton from '@/components/coupon/skeleton/CouponSkeleton'
import CouponSubmissionDetailComponent from '@/components/coupon/submission/detail/CouponSubmissinDetailComponent'

const CouponSubmissionDetailContainer = ({
  router,
  couponSubmission,
  command,
  getDetailCouponSubmission = () => { },
  rejectCouponSubmission = () => { },
  approveCouponSubmission = () => { },
  getCommandCoupon = () => { },
  getCommandUserPosition = () => { },
  getCommandUserUnit = () => { },
  getCommandUserLevel = () => { },
  getCommandRoles = () => { },
  getCommandFilterCouponSubmission = () => { }
}) => {
  const [willRender, setWillRender] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setWillRender(true)
    }, 5000)
  }, [])

  useEffect(() => {
    if (!router.isReady) return
    getDetailCouponSubmission(router.query.id)
  }, [router, getDetailCouponSubmission])

  useEffect(() => {
    getCommandCoupon()
    getCommandUserPosition()
    getCommandUserUnit()
    getCommandUserLevel()
    getCommandRoles()
  }, [getCommandCoupon, getCommandUserPosition, getCommandUserUnit, getCommandUserLevel, getCommandRoles])

  return (
    <Layout
      willRender={willRender}
    >
      {
        willRender === false
          ? (
            <CouponSkeleton />
          ) : (
            <CouponSubmissionDetailComponent
              approveCouponSubmission={approveCouponSubmission}
              command={command}
              couponSubmission={couponSubmission}
              rejectCouponSubmission={rejectCouponSubmission}
              getCommandFilterCouponSubmission={getCommandFilterCouponSubmission}
            />
          )
      }
    </Layout>
  )
}

CouponSubmissionDetailContainer.propTypes = {
  router: PropTypes.object,
  couponSubmission: PropTypes.object,
  command: PropTypes.object,
  getDetailCouponSubmission: PropTypes.func,
  rejectCouponSubmission: PropTypes.func,
  approveCouponSubmission: PropTypes.func,
  getCommandCoupon: PropTypes.func,
  getCommandUserPosition: PropTypes.func,
  getCommandUserUnit: PropTypes.func,
  getCommandUserLevel: PropTypes.func,
  getCommandRoles: PropTypes.func,
  getCommandFilterCouponSubmission: PropTypes.func
}

export default connect(
  mapStateToProps('couponSubmission', 'command'),
  mapActions(
    'getDetailCouponSubmission',
    'rejectCouponSubmission',
    'approveCouponSubmission',
    'getCommandCoupon',
    'getCommandUserPosition',
    'getCommandUserUnit',
    'getCommandUserLevel',
    'getCommandRoles',
    'getCommandFilterCouponSubmission'
  )
)(CouponSubmissionDetailContainer)