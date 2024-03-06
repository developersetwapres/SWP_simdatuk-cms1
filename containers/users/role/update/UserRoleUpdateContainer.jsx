import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { mapActions, mapStateToProps } from '@/store/index'
import { connect } from 'react-redux'
import Layout from '@/components/core/Layout'
import UserRoleSkeleton from '@/components/users/role/UserRoleSkeleton'
import UserRoleUpdateComponent from '@/components/users/role/update/UserRoleUpdateComponent'

const UserRoleUpdateContainer = ({
  router,
  role,
  command,
  getCommandMenu = () => { },
  getDetailRole = () => { },
  updateRole = () => { }
}) => {
  const [willRender, setWillRender] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setWillRender(true)
    }, 5000)
  }, [])

  useEffect(() => {
    if (!router.isReady) return
    getDetailRole(router.query.id)
  }, [router, getDetailRole])

  useEffect(() => {
    getCommandMenu()
  }, [getCommandMenu])

  return (
    <Layout
      willRender={willRender}
    >
      {
        willRender === false
          ? (
            <UserRoleSkeleton />
          ) : (
            <UserRoleUpdateComponent
              command={command}
              role={role}
              updateRole={updateRole}
            />
          )
      }
    </Layout>
  )
}

UserRoleUpdateContainer.propTypes = {
  router: PropTypes.object,
  role: PropTypes.object,
  command: PropTypes.object,
  getCommandMenu: PropTypes.func,
  getDetailRole: PropTypes.func,
  updateRole: PropTypes.func
}

export default connect(
  mapStateToProps('role', 'command'),
  mapActions('getDetailRole', 'updateRole', 'getCommandMenu')
)(UserRoleUpdateContainer)