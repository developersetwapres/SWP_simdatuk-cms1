import { Button } from '@/components/shared'
import { primaryButtonStyle } from '@/utils/theme'
import React from 'react'
import PropTypes from 'prop-types'

function CouponUpdateToolbarComponent({
  loadingCoupon,
  handleSubmit = () => { }
}) {
  return (
    <Button
      text='Submit'
      sx={{
        ...primaryButtonStyle,
        textTransform: 'none'
      }}
      color='warning'
      onClick={handleSubmit}
      isBusy={loadingCoupon?.isSubmit}
      isLoading={loadingCoupon?.loading}
    />
  )
}

CouponUpdateToolbarComponent.propTypes = {
  loadingCoupon: PropTypes.object,
  handleSubmit: PropTypes.func
}

export default CouponUpdateToolbarComponent