import React from 'react'
import { Button } from '@/components/shared'
import { primaryButtonStyle } from '@/utils/theme'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

function CategoryUpdateToolbar({
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
      isBusy={selector.isBusy}
      isLoading={selector.loading}
    />
  )
}

CategoryUpdateToolbar.propTypes = {
  handleSubmit: PropTypes.func
}

export default CategoryUpdateToolbar