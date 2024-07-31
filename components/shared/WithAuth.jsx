/* eslint-disable indent */
import React, { useCallback, useEffect } from 'react'
import { useRouter } from 'next/router'
import { getStorage } from '@/utils/storage'
import {
  Access,
  accessGranted,
  getFirstNPath,
  getUserPermissionIDByPath
} from '@/utils/permissionManager'
import navigation from '../core/navigation'

const WithAuth = (WrappedComponent) => {
  // eslint-disable-next-line react/display-name
  return (props) => {
    // Checks wheter we are on client / browser or server.
    if (typeof window !== 'undefined') {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const Router = useRouter()
      const accessToken = getStorage('setneg_token')
      const slugPattern = /\[([^\]]+)\]/
      const excludedPaths = new Set(['/dashboard', '/logout', '/profile'])

      let pathName
      let currentPath
      let currentPathPermissionID

      let hasPathAccess = false

      const checkAccess = useCallback(() => {
        // If there is no access token we redirect to "/auth/login" page
        if (!accessToken) {
          Router.replace('/auth/login')
          return null
        }

        // If there is no permission to access some path(s), redirect to "/403" page

        pathName = Router?.query?.employment
          ? `/${Router.asPath.split('/')[1]}/${Router?.query?.employment}`
          : Router.asPath
        // const pathName = Router.asPath
        currentPath = getFirstNPath(pathName, 3)
        currentPathPermissionID = getUserPermissionIDByPath(
          pathName,
          navigation
        )

        if (pathName?.includes('add')) {
          hasPathAccess = accessGranted(currentPathPermissionID, Access.CREATE)
        } else if (pathName?.includes('edit')) {
          hasPathAccess = accessGranted(currentPathPermissionID, Access.UPDATE)
        } else {
          hasPathAccess = accessGranted(currentPathPermissionID, Access.READ)
        }
      }, [Router, accessToken])

      checkAccess()

      if (slugPattern.test(Router?.asPath)) {
        checkAccess()
        return null
      }

      if (!hasPathAccess && !excludedPaths.has(currentPath)) {
        Router.replace('/403')
        return null
      }

      // If this is an accessToken we just render the component that was passed with all ots props
      return <WrappedComponent {...props} />
    }

    // If we are on a server, return null
    return null
  }
}

export default WithAuth
