import React from 'react'
import { useRouter } from 'next/router'
import { getStorage } from '@/utils/storage'
import { decryptItem } from '@/utils/crypt'
import navigation from '../core/navigation'
import { Access, accessGranted } from '@/utils/permissionManager'

const WithAuth = (WrappedComponent) => {
  // eslint-disable-next-line react/display-name
  return (props) => {
    // Checks wheter we are on client / browser or server.
    if (typeof window !== 'undefined') {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const Router = useRouter()

      const accessToken = getStorage('setneg_token')
      const menuAccess =
        decryptItem('setneg_menu', 'my-menu') !== null
          ? decryptItem('setneg_menu', 'my-menu')
          : ''

      // If there is no access token we redirect to "/auth/login" page
      if (!accessToken) {
        Router.replace('/auth/login')
        return null
      }

      // If there is no permission to access some path(s), redirect to "/403" page
      const permissions = getPermissions(navigation)
      const excludedPaths = new Set(['/dashboard', '/logout'])
      const permissionsLookup = new Map(permissions.map(i => [i?.path, i?.permissionID]))

      const currentPath = Router.asPath
      const currentPathPermissionID = permissionsLookup.get(currentPath)

      const hasPathAccess = currentPathPermissionID
        ? accessGranted(currentPathPermissionID, Access.READ)
        : false

      if (!hasPathAccess && !excludedPaths.has(currentPath)) {
        Router.replace('/403')
        return null
      }

      // If this is an accessToken we just render the component that was passed with all ots props
      return <WrappedComponent {...props} menu={menuAccess} />
    }

    // If we are on a server, return null
    return null
  }
}

const getPermissions = () => {
  const permissions = []

  for (const item of navigation) {
    if (item?.permissionID === 27) {
      permissions.push({ path: item?.path, permissionID: item?.permissionID })
    }
    if (item?.children?.length > 0) {
      for (const child of item.children) {
        permissions.push({ path: child?.path, permissionID: child?.permissionID })
      }
    }
  }

  return permissions
}


export default WithAuth
