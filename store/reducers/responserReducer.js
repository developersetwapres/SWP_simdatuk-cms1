/* eslint-disable indent */
import {
  ACTION_RESPONSER,
  CLOSE_MODAL
} from '@/store/constants'

const initialState = {
  modal: false,
  code: 200,
  message: '',
  redirect: ''
}

export const responserReducer = (state = initialState, action) => {
  const payload = action?.payload
  switch (action.type) {
    case ACTION_RESPONSER:
      return {
        ...state,
        modal: true,
        code: payload?.code,
        redirect: payload?.redirect,
        message: payload?.message
      }
    case CLOSE_MODAL:
      return {
        ...state,
        modal: false
      }
    default:
      return state
  }
}