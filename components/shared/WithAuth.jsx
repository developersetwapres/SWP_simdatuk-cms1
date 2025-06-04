/* eslint-disable indent */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/display-name */
import React, { useCallback, useEffect, useState } from 'react'
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
  return (props) => {
    if (typeof window === 'undefined') return null

    const Router = useRouter()
    const accessToken = getStorage('setneg_token')
    const slugPattern = /\[([^\]]+)\]/
    const excludedPaths = new Set(['/dashboard', '/logout', '/profile'])

    const [hasCheckedAccess, setHasCheckedAccess] = useState(false)

    const checkAccess = useCallback(() => {
      if (!accessToken) {
        Router.replace('/auth/login')
        return false
      }

      const pathName = Router?.query?.employment
        ? `/${Router.asPath.split('/')[1]}/${Router?.query?.employment}`
        : Router.asPath

      if (slugPattern.test(pathName)) return true

      const currentPath = getFirstNPath(pathName, 3)
      const currentPathPermissionID = getUserPermissionIDByPath(
        pathName,
        navigation
      )

      let hasPathAccess = false

      if (pathName?.includes('add')) {
        hasPathAccess = accessGranted(currentPathPermissionID, Access.CREATE)
      } else if (pathName?.includes('edit')) {
        hasPathAccess = accessGranted(currentPathPermissionID, Access.UPDATE)
      } else {
        hasPathAccess = accessGranted(currentPathPermissionID, Access.READ)
      }

      if (!hasPathAccess && !excludedPaths.has(currentPath)) {
        Router.replace('/403')
        return false
      }

      return true
    }, [Router, accessToken])

    useEffect(() => {
      if (!hasCheckedAccess) {
        const access = checkAccess()
        setHasCheckedAccess(access)
      }
    }, [checkAccess, hasCheckedAccess])

    if (hasCheckedAccess) return <WrappedComponent {...props} />

    return null
  }
}

export default WithAuth
