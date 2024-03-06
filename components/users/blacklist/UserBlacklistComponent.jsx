import React from 'react'
import UserBlacklistToolbarComponent from './UserBlacklistToolbarComponent'
import UserBlacklistListComponent from './UserBlacklistListComponent'
import PropTypes from 'prop-types'

function UserBlacklistComponent({
  blacklist,
  command,
  queries,
  onPaginationChange = () => { },
  onSearch = () => { },
  onPosition = () => { },
  onUnit = () => { },
  onLevel = () => { },
  onRole = () => { },
  onClearState = () => { }
}) {
  return (
    <>
      <UserBlacklistToolbarComponent
        command={command}
        queries={queries}
        onSearch={onSearch}
        onPosition={onPosition}
        onUnit={onUnit}
        onLevel={onLevel}
        onRole={onRole}
        onClearState={onClearState}
      />
      <UserBlacklistListComponent
        items={blacklist?.blacklist}
        pagination={blacklist?.pagination}
        onPaginationChange={onPaginationChange}
        loading={blacklist?.loading}
        resetPagination={queries?.page}
      />
    </>
  )
}

UserBlacklistComponent.propTypes = {
  blacklist: PropTypes.object,
  queries: PropTypes.object,
  command: PropTypes.object,
  onPaginationChange: PropTypes.func,
  onSearch: PropTypes.func,
  onPosition: PropTypes.func,
  onUnit: PropTypes.func,
  onLevel: PropTypes.func,
  onRole: PropTypes.func,
  onClearState: PropTypes.func
}

export default UserBlacklistComponent