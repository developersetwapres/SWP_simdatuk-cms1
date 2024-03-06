import React from 'react'
import ChangePassword from '@/components/core/ChangePassword'
import WithAuth from '@/components/shared/WithAuth'

const index = (props) => {
  return (
    <ChangePassword
      {...props}
    />
  )
}

export default WithAuth(index)