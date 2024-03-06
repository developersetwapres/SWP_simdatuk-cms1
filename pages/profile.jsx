import React from 'react'
import ProfileContainer from '@/containers/ProfileContainer'
import WithAuth from '@/components/shared/WithAuth'

const profile = (props) => {
  return (
    <ProfileContainer
      {...props}
    />
  )
}

export default WithAuth(profile)