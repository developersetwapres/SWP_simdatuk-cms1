import React from 'react'
import { Button } from '@/components/shared'
import { primaryButtonStyle } from '@/utils/theme'
import PropTypes from 'prop-types'

function CouponCreateToolbarComponent({
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

CouponCreateToolbarComponent.propTypes = {
  loadingCoupon: PropTypes.object,
  handleSubmit: PropTypes.func
}

export default CouponCreateToolbarComponent