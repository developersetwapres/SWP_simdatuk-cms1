/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from 'react'
import UserRoleCreateContainer from '@/containers/users/role/create/UserRoleCreateContainer'
import WithAuth from '@/components/shared/WithAuth'
import { onlyRole } from '@/utils/index'


const index = (props) => {
  // const { menu } = props
  // const store = window.__REDUX_STORE__
  // const state = store.getState().responserReducer
  // const checkRole = onlyRole('Peran Pengguna', menu.access)

  // useEffect(() => {
  //   if (!checkRole) {
  //     store.dispatch({
  //       type: 'ACTION_RESPONSER', payload: {
  //         code: state.code,
  //         message: state.message,
  //         redirect: state?.redirect
  //       }
  //     })
  //   }
  // }, [checkRole, store, state])

  return (
    <UserRoleCreateContainer
      {...props}
    />
  )
}

export default WithAuth(index)