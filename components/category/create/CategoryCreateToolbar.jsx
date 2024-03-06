import { Button } from '@/components/shared'
import React from 'react'
import { primaryButtonStyle } from '@/utils/theme'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

function CategoryCreateToolbar({
  handleSubmit = () => { }
}) {
  const selector = useSelector((state) => state.category)
  return (
    <Button
      text='Submit'
      color='warning'
      sx={{
        marginTop: '52px',
        textTransform: 'none',
        ...primaryButtonStyle
      }}
      onClick={handleSubmit}
      isLoading={selector.loading}
      isBusy={selector.isBusy}
    />
  )
}

CategoryCreateToolbar.propTypes = {
  handleSubmit: PropTypes.func
}

export default CategoryCreateToolbar