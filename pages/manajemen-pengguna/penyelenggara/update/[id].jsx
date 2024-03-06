/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from 'react'
import WithAuth from '@/components/shared/WithAuth'
import { withRouter } from 'next/router'
import OrganizerUpdateContainer from '@/containers/organizer/update/OrganizerUpdateContainer'
import { onlyRole } from '@/utils/index'


const detail = (props) => {
  // const { menu } = props
  // const store = window.__REDUX_STORE__
  // const state = store.getState().responserReducer
  // const checkRole = onlyRole('Penyelenggara', menu.access)

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
    <OrganizerUpdateContainer
      {...props}
    />
  )
}

const Wrapped = withRouter(detail)

export default WithAuth(Wrapped)