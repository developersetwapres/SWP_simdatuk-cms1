import React from 'react'
import PropTypes from 'prop-types'
import UserToolbarComponent from './UserToolbarComponent'
import UserListComponent from './UserListComponent'
import UserFilterComponent from './UserFilterComponent'
function UserComponent({
  user,
  queries,
  command,
  exportExcel,
  deleteUser = () => { },
  onPaginationChange = () => { },
  onSearch = () => { },
  onFindUnit = () => { },
  onFindPosition = () => { },
  onFindLevel = () => { },
  onFindRole = () => { },
  onClearFilter = () => { },
  exportFileExcelUserList = () => { }
}) {
  return (
    <>
      <UserToolbarComponent
        exportExcel={exportExcel}
        exportFileExcelUserList={exportFileExcelUserList}
      />
      <UserFilterComponent
        queries={queries}
        command={command}
        onSearch={onSearch}
        onFindUnit={onFindUnit}
        onFindPosition={onFindPosition}
        onFindLevel={onFindLevel}
        onFindRole={onFindRole}
        onClearFilter={onClearFilter}
      />
      <UserListComponent
        user={user}
        items={user?.user}
        pagination={user?.pagination}
        deleteUser={deleteUser}
        onPaginationChange={onPaginationChange}
        loading={user?.loading}
        resetPagination={queries?.page}
      />
    </>
  )
}

UserComponent.propTypes = {
  user: PropTypes.object,
  queries: PropTypes.object,
  command: PropTypes.object,
  exportExcel: PropTypes.object,
  deleteUser: PropTypes.func,
  onPaginationChange: PropTypes.func,
  onSearch: PropTypes.func,
  onFindUnit: PropTypes.func,
  onFindPosition: PropTypes.func,
  onFindLevel: PropTypes.func,
  onFindRole: PropTypes.func,
  onClearFilter: PropTypes.func,
  exportFileExcelUserList: PropTypes.func
}

export default UserComponent