/* eslint-disable no-unused-vars */
import React from 'react'
import PropTypes from 'prop-types'
import DashboardToolbarComponent from './DashboardToolbarComponent'
import DashboardDataComponent from './DashboardData/DashboardDataComponent'

function DashboardComponent({
  banner,
  queries,
  // deleteListBanner = () => { },
  // onPaginationChange = () => { },
  onBirthDay = () => { },
  onClearFilter = () => { }
}) {
  return (
    <>
      <DashboardToolbarComponent
        onBirthDay={onBirthDay}
        queries={queries}
        onClearFilter={onClearFilter}
      />
      <DashboardDataComponent />
    </>
  )
}

DashboardComponent.propTypes = {
  banner: PropTypes.object,
  queries: PropTypes.object,
  deleteListBanner: PropTypes.func,
  onPaginationChange: PropTypes.func,
  onBirthDay: PropTypes.func,
  onClearFilter: PropTypes.func
}

export default DashboardComponent