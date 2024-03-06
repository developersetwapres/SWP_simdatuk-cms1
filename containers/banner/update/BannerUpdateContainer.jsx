import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { mapActions, mapStateToProps } from '@/store/index'
import { connect } from 'react-redux'
import Layout from '@/components/core/Layout'
import BannerSkeleton from '@/components/banner/skeleton/BannerSkeleton'
import BannerUpdateComponent from '@/components/banner/update/BannerUpdateComponent'

const BannerUpdateContainer = ({
  router,
  banner,
  command,
  getBanner = () => { },
  updateBanner = () => { },
  getCommandCourses = () => { }
}) => {
  const [willRender, setWillRender] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setWillRender(true)
    }, 5000)
  }, [])

  useEffect(() => {
    if (!router.isReady) return
    getBanner(router.query.id)
  }, [getBanner, router])

  useEffect(() => {
    getCommandCourses()
  }, [getCommandCourses])

  return (
    <Layout
      willRender={willRender}
    >
      {
        willRender === false
          ? (
            <BannerSkeleton />
          ) : (
            <BannerUpdateComponent
              banner={banner}
              command={command}
              updateBanner={updateBanner}
            />
          )
      }
    </Layout>
  )
}

BannerUpdateContainer.propTypes = {
  router: PropTypes.object,
  banner: PropTypes.object,
  command: PropTypes.object,
  getBanner: PropTypes.func,
  updateBanner: PropTypes.func,
  getCommandCourses: PropTypes.func
}

export default connect(
  mapStateToProps('banner', 'command'),
  mapActions('getBanner', 'updateBanner', 'getCommandCourses')
)(BannerUpdateContainer)
