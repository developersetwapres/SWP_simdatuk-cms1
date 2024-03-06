import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { mapActions, mapStateToProps } from '@/store/index'
import { connect } from 'react-redux'
import Layout from '@/components/core/Layout'
import CouponSkeleton from '@/components/coupon/skeleton/CouponSkeleton'
import CouponDetailComponent from '@/components/coupon/detail/CouponDetailComponent'

const CouponDetailContainer = ({
  router,
  coupon,
  command,
  deleteCoupon = () => { },
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
            <CouponDetailComponent
              command={command}
              coupon={coupon}
              deleteCoupon={deleteCoupon}
              filterCourseByProvider={filterCourseByProvider}
            />
          )
      }
    </Layout>
  )
}

CouponDetailContainer.propTypes = {
  router: PropTypes.object,
  coupon: PropTypes.object,
  command: PropTypes.object,
  deleteCoupon: PropTypes.func,
  getDetailCoupon: PropTypes.func,
  getCommandOrganizer: PropTypes.func,
  getCommandCourses: PropTypes.func,
  filterCourseByProvider: PropTypes.func
}

export default connect(
  mapStateToProps('coupon', 'command'),
  mapActions('deleteCoupon', 'getDetailCoupon', 'getCommandOrganizer', 'getCommandCourses', 'filterCourseByProvider')
)(CouponDetailContainer)