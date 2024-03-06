import React from 'react'
import { Button } from '@/components/shared'
import { primaryButtonStyle } from '@/utils/theme'
import PropTypes from 'prop-types'

function SortBannerToolbar({
  bannerLoading,
  handleSubmit = () => { }
}) {
  return (
    <Button
      text='Submit'
      color='warning'
      sx={{
        ...primaryButtonStyle,
        textTransform: 'none'
      }}
      onClick={handleSubmit}
      isBusy={bannerLoading?.isSubmit}
      isLoading={bannerLoading?.loading}
    />
  )
}

SortBannerToolbar.propTypes = {
  bannerLoading: PropTypes.object,
  handleSubmit: PropTypes.func
}

export default SortBannerToolbar