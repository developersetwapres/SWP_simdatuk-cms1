/* eslint-disable indent */
import {
  SET_NOTIFICATION
} from '../constants'


const initialState = {
  title: '',
  body: ''
}

export const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NOTIFICATION:
      return {
        ...state,
        title: action?.payload?.title,
        body: action?.payload?.body
      }
    default:
      return state
  }
}