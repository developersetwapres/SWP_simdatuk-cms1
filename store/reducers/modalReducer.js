/* eslint-disable indent */
import { CATCH_ERROR, CLEAR_ERROR, CLOSE_MODAL, SET_MODAL } from '../constants'

const initialState = {
  modal: false,
  code: null,
  message: null,
  redirect: '',
  childMessage: ''
}

export const modalReducer = (state = initialState, action) => {
  const data = action?.payload
  switch (action.type) {
    case SET_MODAL:
      return {
        ...state,
        modal: true,
        code: data?.code,
        redirect: data?.redirect,
        message: data?.message,
        childMessage: data?.childMessage
      }
    case CATCH_ERROR:
      return {
        ...state,
        modal: true,
        code: action?.code,
        message: action?.payload
      }
    case CLOSE_MODAL:
      return {
        modal: false,
        code: null,
        message: null,
        redirect: '',
        childMessage: ''
      }
    case CLEAR_ERROR:
      return {
        ...state,
        message: null
      }
    default:
      return state
  }
}
