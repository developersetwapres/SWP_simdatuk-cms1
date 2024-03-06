import React from 'react'
import { Button } from '@/components/shared'
import { primaryButtonStyle } from '@/utils/theme'
import PropTypes from 'prop-types'

function UserRoleCreateToolbar({
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

UserRoleCreateToolbar.propTypes = {
  loadingRole: PropTypes.object,
  handleSubmit: PropTypes.func
}

export default UserRoleCreateToolbar