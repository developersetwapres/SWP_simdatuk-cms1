/* eslint-disable no-unused-vars */
import React from 'react'
import BannerToolbarComponent from './DashboardToolbarComponent'
import PropTypes from 'prop-types'
import BannerDataComponent from '../banner/bannerData/BannerDataComponent'
import { Box } from '@mui/material'

function BannerComponent({
  banner,
  queries,
  // deleteListBanner = () => { },
  // onPaginationChange = () => { },
  onBirthDay = () => { },
  onClearFilter = () => { }
}) {
  return (
    <>
      <BannerToolbarComponent
        onBirthDay={onBirthDay}
        queries={queries}
        onClearFilter={onClearFilter}
      />
      <BannerDataComponent />
    </>
  )
}

BannerComponent.propTypes = {
  banner: PropTypes.object,
  queries: PropTypes.object,
  deleteListBanner: PropTypes.func,
  onPaginationChange: PropTypes.func,
  onBirthDay: PropTypes.func,
  onClearFilter: PropTypes.func
}

export default BannerComponent