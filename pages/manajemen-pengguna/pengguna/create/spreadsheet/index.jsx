/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from 'react'
import WithAuth from '@/components/shared/WithAuth'
import UserCreateSpreadsheetContainer from '@/containers/users/create/spreadsheet/UserCreateSpreadsheetContainer'
import { onlyRole } from '@/utils/index'


const index = (props) => {
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
    <UserCreateSpreadsheetContainer
      {...props}
    />
  )
}

export default WithAuth(index)