import React from 'react'
import UserRoleToolbarComponent from './UserRoleToolbarComponent'
import UserRoleListComponent from './UserRoleListComponent'
import PropTypes from 'prop-types'

function UserRoleComponent({
  queries,
  role,
  onPaginationChange = () => { },
  deleteRoleList = () => { },
  onSearch = () => { },
  onClearState = () => { }
}) {
  return (
    <>
      <UserRoleToolbarComponent
        onSearch={onSearch}
        queries={queries}
        onClearState={onClearState}
      />
      <UserRoleListComponent
        items={role?.roles}
        pagination={role?.pagination}
        onPaginationChange={onPaginationChange}
        deleteRoleList={deleteRoleList}
        loading={role?.loading}
        loadingRole={role}
        resetPagination={queries?.page}
      />
    </>
  )
}

UserRoleComponent.propTypes = {
  queries: PropTypes.object,
  role: PropTypes.object,
  onPaginationChange: PropTypes.func,
  deleteRoleList: PropTypes.func,
  onSearch: PropTypes.func,
  onClearState: PropTypes.func
}

export default UserRoleComponent