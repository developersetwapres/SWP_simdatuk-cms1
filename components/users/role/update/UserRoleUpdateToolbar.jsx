import React from 'react'
import { Button } from '@/components/shared'
import { primaryButtonStyle } from '@/utils/theme'
import PropTypes from 'prop-types'

function UserRoleUpdateToolbar({
  loadingRole,
  handleSubmit = () => { }
}) {
  return (
    <Button
      text='Submit'
      sx={{
        textTransform: 'none',
        ...primaryButtonStyle,
        marginTop: '20px'
      }}
      color='warning'
      onClick={handleSubmit}
      isBusy={loadingRole?.isSubmit}
      isLoading={loadingRole?.loading}
    />
  )
}

UserRoleUpdateToolbar.propTypes = {
  loadingRole: PropTypes.object,
  handleSubmit: PropTypes.func
}

export default UserRoleUpdateToolbar