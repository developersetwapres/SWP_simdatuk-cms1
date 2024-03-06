import React from 'react'
import { Button } from '@/components/shared'
import { primaryButtonStyle } from '@/utils/theme'
import PropTypes from 'prop-types'

function CourseCreateToolbar({
  loadingCourse,
  handleSubmit = () => { }
}) {
  return (
    <div style={{
      marginTop: '20px'
    }}>
      <Button
        text='Submit'
        sx={{
          textTransform: 'none',
          ...primaryButtonStyle
        }}
        color='warning'
        onClick={handleSubmit}
        isBusy={loadingCourse?.isSubmit}
        isLoading={loadingCourse?.loading}
      />
    </div>
  )
}

CourseCreateToolbar.propTypes = {
  loadingCourse: PropTypes.object,
  handleSubmit: PropTypes.func
}

export default CourseCreateToolbar