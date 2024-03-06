import React from 'react'
import PropTypes from 'prop-types'
import BannerDetailFormComponent from './BannerDetailFormComponent'
import BannerDetailToolbar from './BannerDetailToolbar'

function BannerDetailComponent({
  banner,
  command,
  deleteBanner = () => { }
}) {
  return (
    <>
      <h3>Detail Banner</h3>
      <BannerDetailFormComponent
        detail={banner?.detail}
        commandCourse={command.courses}
      />
      <BannerDetailToolbar
        idBanner={banner?.detail?.id}
        deleteBanner={deleteBanner}
        bannerLoading={banner}
      />
    </>
  )
}

BannerDetailComponent.propTypes = {
  banner: PropTypes.object,
  command: PropTypes.object,
  deleteBanner: PropTypes.func
}

export default BannerDetailComponent