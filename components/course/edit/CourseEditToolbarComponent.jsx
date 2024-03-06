import { primaryButtonStyle } from '@/utils/theme'
import React from 'react'
import { Button } from '@/components/shared'
import PropTypes from 'prop-types'

function CourseEditToolbarComponent({
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
          ...primaryButtonStyle,
          textTransform: 'none'
        }}
        color='warning'
        onClick={handleSubmit}
        isBusy={loadingCourse?.isSubmit}
        isLoading={loadingCourse?.loading}
      />
    </div>
  )
}

CourseEditToolbarComponent.propTypes = {
  loadingCourse: PropTypes.object,
  handleSubmit: PropTypes.func
}

export default CourseEditToolbarComponent