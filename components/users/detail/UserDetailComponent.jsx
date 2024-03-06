import React, { useState } from 'react'
import UserDetailFormComponent from './UserDetailFormComponent'
import UserDetailToolbarComponent from './UserDetailToolbarComponent'
import PropTypes from 'prop-types'

function UserDetailComponent({
  user,
  command,
  deleteUser = () => { }
}) {
  const [selected, setSelected] = useState([])
  return (
    <>
      <h3>Detail Pengguna</h3>
      <UserDetailFormComponent
        detail={user?.detail}
        selected={selected}
        setSelected={setSelected}
        command={command}
        userCourse={user?.userCourse}
      />
      <UserDetailToolbarComponent
        deleteUser={deleteUser}
        userId={user?.detail?.id}
      />
    </>
  )
}

UserDetailComponent.propTypes = {
  user: PropTypes.object,
  command: PropTypes.object,
  deleteUser: PropTypes.func
}

export default UserDetailComponent