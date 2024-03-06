import React from 'react'
// import { useRouter } from 'next/router'
// import { getStorage } from '@/utils/storage'
import { decryptItem } from '@/utils/crypt'

const WithAuth = (WrappedComponent) => {
  // eslint-disable-next-line react/display-name
  return (props) => {
    // Checks wheter we are on client / browser or server.
    if (typeof window !== 'undefined') {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      // const Router = useRouter()

      // const accessToken = getStorage('setneg_token')
      const menuAccess = decryptItem('setneg_menu', 'my-menu') !== null ? decryptItem('setneg_menu', 'my-menu') : ''

      // If there is no access token we redirect to "/auth/login" page
      // if (!accessToken) {
      //   Router.replace('/auth/login')
      //   return null
      // }

      // If this is an accessToken we just render the component that was passed with all ots props
      return <WrappedComponent {...props} menu={menuAccess} />
    }

    // If we are on a server, return null 
    return null
  }
}

export default WithAuth