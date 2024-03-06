import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { mapActions, mapStateToProps } from '@/store/index'
import Layout from '@/components/core/Layout'
import UserUpdateComponent from '@/components/users/update/UserUpdateComponent'
import UserSkeleton from '@/components/users/UserSkeleton'

const UserUpdateContainer = ({
  router,
  user,
  command,
  getDetailUser = () => { },
  getCommandRoles = () => { },
  getCommandUserLevel = () => { },
  getCommandUserPosition = () => { },
  getCommandUserUnit = () => { },
  getCommandCategoryTopic = () => { },
  updateUser = () => { }
}) => {
  const [willRender, setWillRender] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setWillRender(true)
    }, 5000)
  })

  useEffect(() => {
    if (!router.isReady) return
    getDetailUser(router.query.id)
  }, [getDetailUser, router])

  useEffect(() => {
    getCommandRoles()
    getCommandUserLevel()
    getCommandUserPosition()
    getCommandUserUnit()
    getCommandCategoryTopic()
  }, [getCommandRoles, getCommandUserLevel, getCommandUserPosition, getCommandUserUnit, getCommandCategoryTopic])

  return (
    <Layout
      willRender={willRender}
    >
      {
        willRender === false
          ? (
            <UserSkeleton />
          ) : (
            <UserUpdateComponent
              command={command}
              user={user}
              updateUser={updateUser}
            />
          )
      }

    </Layout>
  )
}

UserUpdateContainer.propTypes = {
  router: PropTypes.object,
  command: PropTypes.object,
  user: PropTypes.object,
  getDetailUser: PropTypes.func,
  getCommandRoles: PropTypes.func,
  getCommandUserLevel: PropTypes.func,
  getCommandUserPosition: PropTypes.func,
  getCommandUserUnit: PropTypes.func,
  getCommandCategoryTopic: PropTypes.func,
  updateUser: PropTypes.func
}

export default connect(
  mapStateToProps(
    'user', 'command'
  ), mapActions(
    'getDetailUser',
    'getCommandRoles',
    'getCommandUserLevel',
    'getCommandUserPosition',
    'getCommandUserUnit',
    'getCommandCategoryTopic',
    'updateUser'
  )
)(UserUpdateContainer)