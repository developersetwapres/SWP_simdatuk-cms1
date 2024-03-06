/* eslint-disable indent */
import {
  GET_EDITOR_CHOICE_REQUESTED,
  GET_EDITOR_CHOICE_SUCCESS,
  GET_EDITOR_CHOICE_FAILED,
  POST_EDITOR_CHOICE_REQUESTED,
  POST_EDITOR_CHOICE_SUCCESS,
  POST_EDITOR_CHOICE_FAILED,
  GET_LIST_EDITOR_REQUESTED,
  GET_LIST_EDITOR_SUCCESS,
  GET_LIST_EDITOR_FAILED
} from '@/store/constants'

import { SUCCESS_ICON, ERROR_ICON } from '@/utils/iconConstant'


const initialState = {
  editor: [],
  loading: false,
  error: null,
  list: [],
  icon: null,
  isBusy: false
}

export const editor = (state = initialState, action) => {
  const payload = action?.payload

  switch (action.type) {
    case GET_EDITOR_CHOICE_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case GET_EDITOR_CHOICE_SUCCESS:
      return {
        ...state,
        loading: false,
        editor: payload?.data.map((value, index) => {
          return {
            position: index + 1,
            id: value.id,
            text: value.name,
            ...value
          }
        })
      }
    case GET_EDITOR_CHOICE_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error
      }
    case POST_EDITOR_CHOICE_REQUESTED:
      return {
        ...state,
        loading: true,
        isBusy: true
      }
    case POST_EDITOR_CHOICE_SUCCESS:
      return {
        ...state,
        loading: false,
        isBusy: false,
        icon: SUCCESS_ICON,
        message: 'Course berhasil disimpan'
      }
    case POST_EDITOR_CHOICE_FAILED:
      return {
        ...state,
        loading: false,
        isBusy: false,
        message: 'Course gagal disimpan',
        icon: ERROR_ICON,
        error: payload
      }
    case GET_LIST_EDITOR_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case GET_LIST_EDITOR_SUCCESS:
      return {
        ...state,
        loading: false,
        list: payload?.data
      }
    case GET_LIST_EDITOR_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error
      }
    default:
      return state
  }
}