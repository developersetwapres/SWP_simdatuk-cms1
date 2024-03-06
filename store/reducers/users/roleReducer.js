/* eslint-disable indent */
import {
  GET_ROLES_REQUESTED,
  GET_ROLES_SUCCESS,
  GET_ROLES_FAILED,
  GET_DETAIL_ROLE_REQUESTED,
  GET_DETAIL_ROLE_SUCCESS,
  GET_DETAIL_ROLE_FAILED,
  POST_ROLE_REQUESTED,
  POST_ROLE_SUCCESS,
  POST_ROLE_FAILED,
  UPDATE_ROLE_REQUESTED,
  UPDATE_ROLE_SUCCESS,
  UPDATE_ROLE_FAILED,
  DELETE_ROLE_REQUESTED,
  DELETE_ROLE_SUCCESS,
  DELETE_ROLE_FAILED,
  DELETE_ROLE_LIST_REQUESTED,
  DELETE_ROLE_LIST_SUCCESS,
  DELETE_ROLE_LIST_FAILED
} from '@/store/constants'

const initialState = {
  roles: [],
  pagination: {},
  loading: false,
  error: null,
  detail: {},
  isSubmit: false,
  detailData: {}
}

// eslint-disable-next-line no-unused-vars
export const role = (state = initialState, action) => {
  const payload = action?.payload

  switch (action.type) {
    case GET_ROLES_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case GET_ROLES_SUCCESS:
      return {
        ...state,
        loading: false,
        roles: payload?.data,
        pagination: payload?.pagination
      }
    case GET_ROLES_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error
      }
    case GET_DETAIL_ROLE_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case GET_DETAIL_ROLE_SUCCESS: {
      //* Transform 
      function transform(array) {
        return Object.values(
          array.reduce((obj, { menu_id, menu_access, menu_name }) => {
            if (obj[menu_id]) {
              obj[menu_id].menu_access.push(menu_access)
            } else {
              obj[menu_id] = { menu_id, menu_name, menu_access: [menu_access] }
            }
            return obj
          }, {})
        )
      }
      return {
        ...state,
        loading: false,
        detail: transform(payload?.data?.menu),
        detailData: payload?.data
      }
    }
    case GET_DETAIL_ROLE_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error
      }
    case POST_ROLE_REQUESTED:
      return {
        ...state,
        loading: true,
        isSubmit: true
      }
    case POST_ROLE_SUCCESS:
      return {
        ...state,
        loading: false,
        isSubmit: false
      }
    case POST_ROLE_FAILED:
      return {
        ...state,
        loading: false,
        isSubmit: false,
        error: payload?.error
      }
    case UPDATE_ROLE_REQUESTED:
      return {
        ...state,
        loading: true,
        isSubmit: true
      }
    case UPDATE_ROLE_SUCCESS:
      return {
        ...state,
        loading: false,
        isSubmit: false
      }
    case UPDATE_ROLE_FAILED:
      return {
        ...state,
        loading: false,
        isSubmit: false,
        error: payload?.error
      }
    case DELETE_ROLE_REQUESTED:
      return {
        ...state,
        loading: true,
        isSubmit: true
      }
    case DELETE_ROLE_SUCCESS:
      return {
        ...state,
        loading: false,
        isSubmit: false
      }
    case DELETE_ROLE_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error,
        isSubmit: false
      }
    case DELETE_ROLE_LIST_REQUESTED:
      return {
        ...state,
        loading: true,
        isSubmit: true
      }
    case DELETE_ROLE_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        isSubmit: false
      }
    case DELETE_ROLE_LIST_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error,
        isSubmit: false
      }
    default:
      return state

  }
}