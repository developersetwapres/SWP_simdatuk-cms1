import React from 'react'
import CouponToolbarComponent from './CouponToolbarComponent'
import CouponListComponent from './CouponListComponent'
import PropTypes from 'prop-types'
import CouponFilterComponent from './CouponFilterComponent'


function CouponComponent({
  queries,
  coupon,
  command,
  onSearch = () => { },
  onPaginationChange = () => { },
  deleteCouponList = () => { },
  onProvider = () => { },
  onDateRange = () => { },
  onClearState = () => { },
  onStatus = () => { }
}) {
  return (
    <>
      <CouponToolbarComponent
      />
      <CouponFilterComponent
        queries={queries}
        onSearch={onSearch}
        command={command}
        onProvider={onProvider}
        onDateRange={onDateRange}
        onClearState={onClearState}
        onStatus={onStatus}
      />
      <CouponListComponent
        items={coupon?.coupon}
        pagination={coupon?.pagination}
        onPaginationChange={onPaginationChange}
        deleteCouponList={deleteCouponList}
        loading={coupon?.loading}
        resetPagination={queries?.page}
      />
    </>
  )
}

CouponComponent.propTypes = {
  queries: PropTypes.object,
  coupon: PropTypes.object,
  command: PropTypes.object,
  onSearch: PropTypes.func,
  onPaginationChange: PropTypes.func,
  deleteCouponList: PropTypes.func,
  onProvider: PropTypes.func,
  onDateRange: PropTypes.func,
  onClearState: PropTypes.func,
  onStatus: PropTypes.func
}

export default CouponComponent