/* eslint-disable indent */
import {
  GET_COURSE_REQUESTED,
  GET_COURSE_SUCCESS,
  GET_COURSE_FAILED,
  DELETE_COURSE_REQUESTED,
  DELETE_COURSE_SUCCESS,
  DELETE_COURSE_FAILED,
  POST_COURSE_REQUESTED,
  POST_COURSE_SUCCESS,
  POST_COURSE_FAILED,
  DELETE_COURSE_LIST_REQUESTED,
  DELETE_COURSE_LIST_SUCCESS,
  DELETE_COURSE_LIST_FAILED,
  GET_DETAIL_COURSE_REQUESTED,
  GET_DETAIL_COURSE_SUCCESS,
  GET_DETAIL_COURSE_FAILED,
  UPDATE_COURSE_REQUESTED,
  UPDATE_COURSE_SUCCESS,
  UPDATE_COURSE_FAILED,
  PATCH_BULK_COURSE_REQUESTED,
  PATCH_BULK_COURSE_SUCCESS,
  PATCH_BULK_COURSE_FAILED,
  FILTER_COURSE_CATEGORY_REQUESTED,
  FILTER_COURSE_CATEGORY_SUCCESS,
  FILTER_COURSE_CATEGORY_FAILED
} from '@/store/constants'

import { SUCCESS_ICON, ERROR_ICON } from '@/utils/iconConstant'

const initialState = {
  data: [],
  pagination: {},
  loading: false,
  editorChoice: [
    {
      id: 1,
      text: 'Angular',
      coachName: 'Mark Cooper',
      organizer: 'Udemy',
      category: 'Teknologi',
      topic: 'Frontend',
      level: 'Intermediate',
      duration: '10 JP',
      cost: 'Freemium',
      status: 'Terpublikasi'
    },
    {
      id: 2,
      text: 'Finansial untuk umur 20',
      coachName: 'Mark Cooper',
      organizer: 'Udemy',
      category: 'Teknologi',
      topic: 'Frontend',
      level: 'Intermediate',
      duration: '10 JP',
      cost: 'Freemium',
      status: 'Terpublikasi'
    }
  ],
  detail: {},
  filterCourse: [],
  message: '',
  icon: null,
  loadingBulk: '',
  isSubmit: false
}

// eslint-disable-next-line no-unused-vars
export const course = (state = initialState, action) => {
  const payload = action?.payload

  switch (action.type) {
    case GET_COURSE_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case GET_COURSE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: payload?.data,
        pagination: payload?.pagination
      }
    case GET_COURSE_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error
      }
    case DELETE_COURSE_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case DELETE_COURSE_SUCCESS:
      return {
        ...state,
        loading: false
      }
    case DELETE_COURSE_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error
      }
    case POST_COURSE_REQUESTED:
      return {
        ...state,
        loading: true,
        isSubmit: true
      }
    case POST_COURSE_SUCCESS:
      return {
        ...state,
        loading: false,
        isSubmit: false
      }
    case POST_COURSE_FAILED:
      return {
        ...state,
        loading: false,
        isSubmit: false,
        error: payload?.error
      }
    case DELETE_COURSE_LIST_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case DELETE_COURSE_LIST_SUCCESS:
      return {
        ...state,
        loading: false
      }
    case DELETE_COURSE_LIST_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error
      }
    case GET_DETAIL_COURSE_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case GET_DETAIL_COURSE_SUCCESS:
      return {
        ...state,
        loading: false,
        detail: payload?.data
      }
    case GET_DETAIL_COURSE_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error
      }
    case UPDATE_COURSE_REQUESTED:
      return {
        ...state,
        loading: true,
        isSubmit: true
      }
    case UPDATE_COURSE_SUCCESS:
      return {
        ...state,
        loading: false,
        isSubmit: false
      }
    case UPDATE_COURSE_FAILED:
      return {
        ...state,
        loading: false,
        isSubmit: false,
        error: payload?.error
      }
    case PATCH_BULK_COURSE_REQUESTED:
      return {
        ...state,
        loadingBulk: 'IDLE',
        icon: null,
        message: ''
      }
    case PATCH_BULK_COURSE_SUCCESS:
      return {
        ...state,
        loadingBulk: 'SUCCESS',
        icon: SUCCESS_ICON,
        message: 'Perubahan Course berhasil disimpan'
      }
    case PATCH_BULK_COURSE_FAILED:
      return {
        ...state,
        loadingBulk: 'FAILED',
        error: payload,
        icon: ERROR_ICON,
        message: 'Perubahan Course gagal disimpan'
      }
    case FILTER_COURSE_CATEGORY_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case FILTER_COURSE_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        filterCourse: payload?.data
      }
    case FILTER_COURSE_CATEGORY_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error
      }
    default:
      return state
  }
}