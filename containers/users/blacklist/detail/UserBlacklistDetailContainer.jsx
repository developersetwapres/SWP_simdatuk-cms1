import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { mapActions, mapStateToProps } from '@/store/index'
import { connect } from 'react-redux'
import Layout from '@/components/core/Layout'
import UserBlacklistSkeleton from '@/components/users/blacklist/detail/UserBlacklistSkeleton'
import UserBlacklistDetailComponent from '@/components/users/blacklist/detail/UserBlacklistDetailComponent'

const UserBlacklistDetailContainer = ({
  router,
  blacklist,
  command,
  getDetailBlacklist = () => { },
  getCourseLevel = () => { },
  openBlacklist = () => { }
}) => {
  const [willRender, setWillRender] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setWillRender(true)
    }, 5000)
  })

  useEffect(() => {
    if (!router.isReady) return
    getDetailBlacklist(router.query.id)
  }, [router, getDetailBlacklist])

  useEffect(() => {
    getCourseLevel()
  }, [getCourseLevel])

  return (
    <Layout
      willRender={willRender}
    >
      {
        willRender === false
          ? (
            <UserBlacklistSkeleton />
          ) : (
            <UserBlacklistDetailComponent
              blacklist={blacklist}
              command={command}
              openBlacklistUser={openBlacklist}
            />
          )
      }
    </Layout>
  )
}

UserBlacklistDetailContainer.propTypes = {
  router: PropTypes.object,
  blacklist: PropTypes.object,
  command: PropTypes.object,
  getDetailBlacklist: PropTypes.func,
  getCourseLevel: PropTypes.func,
  openBlacklist: PropTypes.func
}

export default connect(
  mapStateToProps(
    'blacklist',
    'command'
  ), mapActions(
    'getDetailBlacklist',
    'getCourseLevel',
    'openBlacklist'
  )
)(UserBlacklistDetailContainer)