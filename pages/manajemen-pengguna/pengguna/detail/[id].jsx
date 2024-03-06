/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from 'react'
import UserDetailContainer from '@/containers/users/detail/UserDetailContainer'
import WithAuth from '@/components/shared/WithAuth'
import { withRouter } from 'next/router'
import { onlyRole } from '@/utils/index'

const detail = (props) => {
  const { menu } = props
  const store = window.__REDUX_STORE__
  const state = store.getState().responserReducer
  const checkRole = onlyRole('Pengguna', menu.access)


  useEffect(() => {
    if (!checkRole) {
      store.dispatch({
        type: 'ACTION_RESPONSER', payload: {
          code: state.code,
          message: state.message,
          redirect: state?.redirect
        }
      })
    }
  }, [checkRole, store, state])

  return (
    <UserDetailContainer
      {...props}
    />
  )
}

const Wrapped = withRouter(detail)

export default WithAuth(Wrapped)