import React from 'react'
import PropTypes from 'prop-types'
import ActivityLogListComponent from './ActivityLogListComponent'
import ActivityLogToolbarComponent from './ActivityLogToolbarComponent'

function ActivityLogComponent({
  queries,
  activitylog,
  command,
  onPaginationChange = () => { },
  onSearch = () => { },
  onClearFilter = () => { },
  onRole = () => { },
  onDate = () => { }
}) {
  return (
    <>
      <ActivityLogToolbarComponent
        onSearch={onSearch}
        command={command}
        queries={queries}
        onRole={onRole}
        onDate={onDate}
        onClearFilter={onClearFilter}
      />
      <ActivityLogListComponent
        items={activitylog?.log}
        pagination={activitylog?.pagination}
        onPaginationChange={onPaginationChange}
        loading={activitylog?.loading}
        resetPagination={queries?.page}
      />
    </>
  )
}

ActivityLogComponent.propTypes = {
  queries: PropTypes.object,
  activitylog: PropTypes.object,
  command: PropTypes.object,
  onPaginationChange: PropTypes.func,
  onSearch: PropTypes.func,
  onClearFilter: PropTypes.func,
  onRole: PropTypes.func,
  onDate: PropTypes.func
}

export default ActivityLogComponent