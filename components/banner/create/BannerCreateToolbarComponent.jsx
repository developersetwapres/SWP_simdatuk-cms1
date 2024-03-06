import React from 'react'
import { Button } from '@/components/shared'
import { primaryButtonStyle } from '@/utils/theme'
import PropTypes from 'prop-types'

function BannerCreateToolbarComponent({
  loading,
  handleSubmit = () => { }
}) {
  return (
    <Button
      text='Submit'
      color='warning'
      sx={{
        margin: '20px 0',
        ...primaryButtonStyle,
        textTransform: 'none'
      }}
      onClick={handleSubmit}
      isBusy={loading?.isSubmit}
      isLoading={loading?.loading}
    />
  )
}

BannerCreateToolbarComponent.propTypes = {
  loading: PropTypes.object,
  handleSubmit: PropTypes.func
}

export default BannerCreateToolbarComponent