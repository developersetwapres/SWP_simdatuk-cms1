import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { mapActions, mapStateToProps } from '@/store/index'
import { connect } from 'react-redux'
import Layout from '@/components/core/Layout'
import CouponSkeleton from '@/components/coupon/skeleton/CouponSkeleton'
import CouponUpdateComponent from '@/components/coupon/update/CouponUpdateComponent'

const CouponUpdateContainer = ({
  router,
  coupon,
  command,
  updateCoupon = () => { },
  getDetailCoupon = () => { },
  getCommandOrganizer = () => { },
  getCommandCourses = () => { },
  filterCourseByProvider = () => { }
}) => {
  const [willRender, setWillRender] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setWillRender(true)
    }, 5000)
  }, [])

  useEffect(() => {
    if (!router.isReady) return
    getDetailCoupon(router.query.id)
  }, [router, getDetailCoupon])

  useEffect(() => {
    getCommandOrganizer()
    getCommandCourses()
  }, [getCommandOrganizer, getCommandCourses])

  return (
    <Layout
      willRender={willRender}
    >
      {
        willRender === false
          ? (
            <CouponSkeleton />
          ) : (
            <CouponUpdateComponent
              command={command}
              coupon={coupon}
              updateCoupon={updateCoupon}
              filterCourseByProvider={filterCourseByProvider}
            />
          )
      }
    </Layout>
  )
}

CouponUpdateContainer.propTypes = {
  router: PropTypes.object,
  coupon: PropTypes.object,
  command: PropTypes.object,
  updateCoupon: PropTypes.func,
  getDetailCoupon: PropTypes.func,
  getCommandOrganizer: PropTypes.func,
  getCommandCourses: PropTypes.func,
  filterCourseByProvider: PropTypes.func
}

export default connect(
  mapStateToProps('coupon', 'command'),
  mapActions('updateCoupon', 'getDetailCoupon', 'getCommandOrganizer', 'getCommandCourses', 'filterCourseByProvider')
)(CouponUpdateContainer)