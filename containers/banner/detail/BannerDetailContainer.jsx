import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { mapActions, mapStateToProps } from '@/store/index'
import { connect } from 'react-redux'
import Layout from '@/components/core/Layout'
import BannerSkeleton from '@/components/banner/skeleton/BannerSkeleton'
import BannerDetailComponent from '@/components/banner/detail/BannerDetailComponent'

const BannerDetailContainer = ({
  router,
  banner,
  command,
  getBanner = () => { },
  deleteBanner = () => { },
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
            <BannerDetailComponent
              banner={banner}
              command={command}
              deleteBanner={deleteBanner}
            />
          )
      }
    </Layout>
  )
}

BannerDetailContainer.propTypes = {
  router: PropTypes.object,
  banner: PropTypes.object,
  command: PropTypes.object,
  getBanner: PropTypes.func,
  deleteBanner: PropTypes.func,
  getCommandCourses: PropTypes.func
}

export default connect(
  mapStateToProps('banner', 'command'),
  mapActions('getBanner', 'deleteBanner', 'getCommandCourses')
)(BannerDetailContainer)