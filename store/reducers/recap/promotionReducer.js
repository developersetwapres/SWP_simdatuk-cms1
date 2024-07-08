/* eslint-disable indent */
import {
  GET_UNOCCUPIED_POSITIONS_REQUESTED,
  GET_UNOCCUPIED_POSITIONS_SUCCESS,
  GET_UNOCCUPIED_POSITIONS_FAILED,
  GET_UNOCCUPIED_POSITIONS_DETAILS_REQUESTED,
  GET_UNOCCUPIED_POSITIONS_DETAILS_SUCCESS,
  GET_UNOCCUPIED_POSITIONS_DETAILS_FAILED,
  GET_BRIEF_USERS_REQUESTED,
  GET_BRIEF_USERS_SUCCESS,
  GET_BRIEF_USERS_FAILED,
  GET_COMPARE_USERS_REQUESTED,
  GET_COMPARE_USERS_SUCCESS,
  GET_COMPARE_USERS_FAILED
} from '@/store/constants'

const initialState = {
  loading: false,
  error: null,
  employees: [],
  employeesDetail: [],
  employeesPagination: {},
  unoccupiedPositions: [],
  unoccupiedPositionsDetail: [],
  message: '',
  icon: null
}

export const promotions = (state = initialState, actions) => {
  const payload = actions?.payload

  switch (actions.type) {
    case GET_UNOCCUPIED_POSITIONS_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case GET_UNOCCUPIED_POSITIONS_DETAILS_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case GET_BRIEF_USERS_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case GET_COMPARE_USERS_REQUESTED:
      return {
        ...state,
        loading: true
      }

    case GET_UNOCCUPIED_POSITIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        unoccupiedPositions: payload?.data
      }
    case GET_UNOCCUPIED_POSITIONS_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        unoccupiedPositionsDetail: payload?.data
      }
    case GET_COMPARE_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        employeesDetail: payload?.data
      }
    case GET_BRIEF_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        employees: payload?.data,
        employeesPagination: payload?.pagination
      }

    case GET_UNOCCUPIED_POSITIONS_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error
      }
    case GET_UNOCCUPIED_POSITIONS_DETAILS_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error
      }
    case GET_COMPARE_USERS_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error
      }
    case GET_BRIEF_USERS_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error
      }
    default:
      return state
  }
}
