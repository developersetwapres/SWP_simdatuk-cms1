import React from 'react'
import OrganizerToolbarComponent from './OrganizerToolbarComponent'
import PropTypes from 'prop-types'
import OrganizerListComponent from './OrganizerListComponent'

function OrganizerComponent({
  provider,
  queries,
  deleteListProvider = () => { },
  onPaginationChange = () => { },
  onSearch = () => { },
  onClearFilter = () => { }
}) {
  return (
    <>
      <OrganizerToolbarComponent
        onSearch={onSearch}
        queries={queries}
        onClearFilter={onClearFilter}
      />
      <OrganizerListComponent
        items={provider?.provider}
        pagination={provider?.pagination}
        deleteListProvider={deleteListProvider}
        onPaginationChange={onPaginationChange}
        loading={provider?.loading}
        loadingProvider={provider}
        resetPagination={queries?.page}
      />
    </>
  )
}

OrganizerComponent.propTypes = {
  provider: PropTypes.object,
  queries: PropTypes.object,
  deleteListProvider: PropTypes.func,
  onPaginationChange: PropTypes.func,
  onSearch: PropTypes.func,
  onClearFilter: PropTypes.func
}

export default OrganizerComponent