import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { mapActions, mapStateToProps } from '@/store/index'
import { connect } from 'react-redux'
import Layout from '@/components/core/Layout'
import OrganizerSkeleton from '@/components/organizer/OrganizerSkeleton'
import OrganizerUpdateComponent from '@/components/organizer/update/OrganizerUpdateComponent'

const OrganizerUpdateContainer = ({
  router,
  provider,
  getDetailProvider = () => { },
  updateProvider = () => { }

}) => {
  const [willRender, setWillRender] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setWillRender(true)
    }, 5000)
  }, [])

  useEffect(() => {
    if (!router.isReady) return
    getDetailProvider(router.query.id)
  }, [getDetailProvider, router])

  return (
    <Layout
      willRender={willRender}
    >
      {
        willRender === false
          ? (
            <OrganizerSkeleton />
          ) : (
            <OrganizerUpdateComponent
              provider={provider}
              updateProvider={updateProvider}
            />
          )
      }
    </Layout>
  )
}

OrganizerUpdateContainer.propTypes = {
  router: PropTypes.object,
  provider: PropTypes.object,
  getDetailProvider: PropTypes.func,
  updateProvider: PropTypes.func
}

export default connect(
  mapStateToProps('provider'),
  mapActions('getDetailProvider', 'updateProvider')
)(OrganizerUpdateContainer)