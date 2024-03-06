import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { mapActions, mapStateToProps } from '@/store/index'
import { connect } from 'react-redux'
import Layout from '@/components/core/Layout'
import UserSkeleton from '@/components/users/UserSkeleton'
import UserDetailComponent from '@/components/users/detail/UserDetailComponent'

const UserDetailContainer = ({
  router,
  command,
  user,
  getDetailUser = () => { },
  getUserCourse = () => { },
  getCommandRoles = () => { },
  getCommandUserLevel = () => { },
  getCommandUserPosition = () => { },
  getCommandUserUnit = () => { },
  getCommandCategoryTopic = () => { },
  deleteUser = () => { }
}) => {

  const [willRender, setWillRender] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setWillRender(true)
    }, 5000)
  }, [])

  useEffect(() => {
    if (!router.isReady) return
    getDetailUser(router.query.id)
    getUserCourse(router.query.id)
  }, [router, getUserCourse, getDetailUser])

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
            <UserDetailComponent
              user={user}
              command={command}
              deleteUser={deleteUser}
            />
          )
      }
    </Layout>
  )
}

UserDetailContainer.propTypes = {
  user: PropTypes.object,
  command: PropTypes.object,
  router: PropTypes.object,
  getDetailUser: PropTypes.func,
  getUserCourse: PropTypes.func,
  getCommandRoles: PropTypes.func,
  getCommandUserLevel: PropTypes.func,
  getCommandUserPosition: PropTypes.func,
  getCommandUserUnit: PropTypes.func,
  getCommandCategoryTopic: PropTypes.func,
  deleteUser: PropTypes.func
}



export default connect(
  mapStateToProps(
    'user',
    'command'
  ), mapActions(
    'getDetailUser',
    'deleteUser',
    'getCommandRoles',
    'getCommandUserLevel',
    'getCommandUserPosition',
    'getCommandUserUnit',
    'getCommandCategoryTopic',
    'getUserCourse'
  )
)(UserDetailContainer)