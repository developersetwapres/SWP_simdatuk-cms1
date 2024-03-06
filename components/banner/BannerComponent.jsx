import React from 'react'
import BannerToolbarComponent from './BannerToolbarComponent'
import PropTypes from 'prop-types'
import BannerListComponent from './BannerListComponent'

function BannerComponent({
  banner,
  queries,
  deleteListBanner = () => { },
  onPaginationChange = () => { },
  onSearch = () => { },
  onStatus = () => { },
  onType = () => { },
  onClearFilter = () => { }
}) {
  return (
    <>
      <BannerToolbarComponent
        onSearch={onSearch}
        onStatus={onStatus}
        onType={onType}
        queries={queries}
        onClearFilter={onClearFilter}
      />
      <BannerListComponent
        items={banner?.banner}
        pagination={banner?.pagination}
        deleteListBanner={deleteListBanner}
        onPaginationChange={onPaginationChange}
        loading={banner?.loading}
        bannerLoading={banner}
        resetPagination={queries?.page}
      />
    </>
  )
}

BannerComponent.propTypes = {
  banner: PropTypes.object,
  queries: PropTypes.object,
  deleteListBanner: PropTypes.func,
  onPaginationChange: PropTypes.func,
  onSearch: PropTypes.func,
  onStatus: PropTypes.func,
  onType: PropTypes.func,
  onClearFilter: PropTypes.func
}

export default BannerComponent