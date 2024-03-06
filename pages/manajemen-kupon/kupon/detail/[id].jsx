/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from 'react'
import CouponDetailContainer from '@/containers/coupon/detail/CouponDetailContainer'
import WithAuth from '@/components/shared/WithAuth'
import { withRouter } from 'next/router'
import { onlyRole } from '@/utils/index'

const index = (props) => {
  // const { menu } = props
  // const store = window.__REDUX_STORE__
  // const state = store.getState().responserReducer
  // const checkRole = onlyRole('Kupon', menu.access)

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
    <CouponDetailContainer
      {...props}
    />
  )
}

const Wrapped = withRouter(index)

export default WithAuth(Wrapped)