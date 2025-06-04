import React from 'react'
import ProfileContainer from '@/containers/ProfileContainer'
import WithAuth from '@/components/shared/WithAuth'

const profile = () => {
  return (
    <ProfileContainer />
  )
}

export default WithAuth(profile)