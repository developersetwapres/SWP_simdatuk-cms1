import React, { useEffect } from 'react'
import CouponDetailFormComponent from './CouponDetailFormComponent'
import CouponDetailToolbar from './CouponDetailToolbar'
import PropTypes from 'prop-types'

function CouponDetailComponent({
  coupon,
  command,
  deleteCoupon = () => { },
  filterCourseByProvider = () => { }
}) {

  useEffect(() => {
    if (coupon?.detail?.provider !== '') {
      filterCourseByProvider(coupon?.detail?.provider.id)
    }
  }, [coupon, filterCourseByProvider])
  return (
    <>
      <h3>Detail Kupon</h3>
      <CouponDetailFormComponent
        detail={coupon?.detail}
        command={command}
      />
      <CouponDetailToolbar
        couponId={coupon?.detail?.id}
        deleteCoupon={deleteCoupon}
      />
    </>
  )
}

CouponDetailComponent.propTypes = {
  coupon: PropTypes.object,
  command: PropTypes.object,
  deleteCoupon: PropTypes.func,
  filterCourseByProvider: PropTypes.func
}

export default CouponDetailComponent