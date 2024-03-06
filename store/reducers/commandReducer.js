/* eslint-disable indent */
import {
  GET_COMMAND_TOPIC_REQUESTED,
  GET_COMMAND_TOPIC_SUCCESS,
  GET_COMMAND_TOPIC_FAILED,
  GET_COMMAND_COURSE_LEVEL_REQUESTED,
  GET_COMMAND_COURSE_LEVEL_SUCCESS,
  GET_COMMAND_COURSE_LEVEL_FAILED,
  GET_COMMAND_COURSE_CATEGORY_REQUESTED,
  GET_COMMAND_COURSE_CATEGORY_SUCCESS,
  GET_COMMAND_COURSE_CATEGORY_FAILED,
  GET_USER_ME_REQUESTED,
  GET_USER_ME_SUCCESS,
  GET_USER_ME_FAILED,
  UPDATE_PASSWORD_USER_ME_REQUESTED,
  UPDATE_PASSWORD_USER_ME_SUCCESS,
  UPDATE_PASSWORD_USER_ME_FAILED,
  GET_COMMAND_COURSES_REQUESTED,
  GET_COMMAND_COURSES_SUCCESS,
  GET_COMMAND_COURSES_FAILED,
  GET_COMMAND_MENU_REQUESTED,
  GET_COMMAND_MENU_SUCCESS,
  GET_COMMAND_MENU_FAILED,
  GET_COMMAND_LANGUAGE_REQUESTED,
  GET_COMMAND_LANGUAGE_SUCCESS,
  GET_COMMAND_LANGUAGE_FAILED,
  GET_COMMAND_PRICE_REQUESTED,
  GET_COMMAND_PRICE_SUCCESS,
  GET_COMMAND_PRICE_FAILED,
  GET_COMMAND_ORGANIZER_REQUESTED,
  GET_COMMAND_ORGANIZER_SUCCESS,
  GET_COMMAND_ORGANIZER_FAILED,
  GET_COMMAND_COUPON_REQUESTED,
  GET_COMMAND_COUPON_SUCCESS,
  GET_COMMAND_COUPON_FAILED,
  GET_COMMAND_ROLES_REQUESTED,
  GET_COMMAND_ROLES_SUCCESS,
  GET_COMMAND_ROLES_FAILED,
  GET_COMMAND_CATEGORY_REQUESTED,
  GET_COMMAND_CATEGORY_SUCCESS,
  GET_COMMAND_CATEGORY_FAILED,
  GET_COMMAND_USER_LEVEL_REQUESTED,
  GET_COMMAND_USER_LEVEL_SUCCESS,
  GET_COMMAND_USER_LEVEL_FAILED,
  GET_COMMAND_USER_POSITION_REQUESTED,
  GET_COMMAND_USER_POSITION_SUCCESS,
  GET_COMMAND_USER_POSITION_FAILED,
  GET_COMMAND_USER_UNIT_REQUESTED,
  GET_COMMAND_USER_UNIT_SUCCESS,
  GET_COMMAND_USER_UNIT_FAILED,
  GET_COMMAND_CATEGORY_TOPIC_REQUESTED,
  GET_COMMAND_CATEGORY_TOPIC_SUCCESS,
  GET_COMMAND_CATEGORY_TOPIC_FAILED,
  GET_COMMAND_COURSE_USER_REQUESTED,
  GET_COMMAND_COURSE_USER_SUCCESS,
  GET_COMMAND_COURSE_USER_FAILED,
  GET_COMMAND_DURATION_REQUESTED,
  GET_COMMAND_DURATION_SUCCESS,
  GET_COMMAND_DURATION_FAILED,
  GET_NOTIFICATION_REQUESTED,
  GET_NOTIFICATION_SUCCESS,
  GET_NOTIFICATION_FAILED,
  FILTER_COURSE_BY_PROVIDER_REQUESTED,
  FILTER_COURSE_BY_PROVIDER_SUCCESS,
  FILTER_COURSE_BY_PROVIDER_FAILED,
  GET_COMMAND_FILTER_COUPON_SUBMISSION_REQUESTED,
  GET_COMMAND_FILTER_COUPON_SUBMISSION_SUCCESS,
  GET_COMMAND_FILTER_COUPON_SUBMISSION_FAILED
} from '../constants'

const initialState = {
  topic: [],
  courseLevel: [],
  courseCategory: [],
  loading: false,
  error: null,
  user: {},
  courses: [],
  menu: [],
  languages: [],
  prices: [],
  organizer: [],
  coupon: [],
  roles: [],
  category: [],
  userLevel: [],
  userPosition: [],
  userUnit: [],
  categoryTopic: [],
  courseUser: [],
  courseDuration: [],
  notification: [],
  courseProvider: [],
  couponSubmissionFilter: []
}

export const command = (state = initialState, action) => {
  const payload = action?.payload

  switch (action.type) {
    case GET_COMMAND_TOPIC_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case GET_COMMAND_TOPIC_SUCCESS:
      return {
        ...state,
        loading: false,
        topic: payload?.data?.map((value) => {
          return {
            id: value.id,
            text: value.name
          }
        })
      }
    case GET_COMMAND_TOPIC_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error
      }
    case GET_COMMAND_COURSE_LEVEL_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case GET_COMMAND_COURSE_LEVEL_SUCCESS:
      return {
        ...state,
        loading: false,
        courseLevel: payload?.data?.map((value) => {
          return {
            id: value.id,
            text: value.name
          }
        })
      }
    case GET_COMMAND_COURSE_LEVEL_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error
      }
    case GET_COMMAND_COURSE_CATEGORY_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case GET_COMMAND_COURSE_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        courseCategory: payload?.data?.map((value) => {
          return {
            id: value.id,
            text: value.name
          }
        })
      }
    case GET_COMMAND_COURSE_CATEGORY_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error
      }
    case GET_USER_ME_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case GET_USER_ME_SUCCESS:
      return {
        ...state,
        loading: false,
        user: payload?.data
      }
    case GET_USER_ME_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error
      }
    case UPDATE_PASSWORD_USER_ME_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case UPDATE_PASSWORD_USER_ME_SUCCESS:
      return {
        ...state,
        loading: false
      }
    case UPDATE_PASSWORD_USER_ME_FAILED:
      return {
        ...state,
        loading: false,
        error: null
      }
    case GET_COMMAND_COURSES_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case GET_COMMAND_COURSES_SUCCESS:
      return {
        ...state,
        loading: false,
        courses: payload?.data?.map((value) => {
          return {
            id: value.id,
            text: value.name
          }
        })
      }
    case GET_COMMAND_COURSES_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error
      }
    case GET_COMMAND_MENU_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case GET_COMMAND_MENU_SUCCESS: {
      return {
        ...state,
        loading: false,
        menu: payload?.data.map((val) => {
          if (val.name === 'Pengguna') {
            return {
              id: val.id,
              text: val.name,
              access: [
                {
                  menu_id: val.id,
                  id: 1,
                  text: 'Pengguna ( View, Create, Update )',
                  name: 'CRU',
                  menu: [0, 1, 2]
                },
                {
                  menu_id: val.id,
                  id: 2,
                  text: 'Delete',
                  name: 'D',
                  menu: [3]
                }
              ]
            }
          } else if (val.name === 'Peran Pengguna') {
            return {
              id: val.id,
              text: val.name,
              access: [
                {
                  menu_id: val.id,
                  id: 1,
                  text: 'Peran Pengguna ( View, Create, Update )',
                  name: 'CRU',
                  menu: [0, 1, 2]
                },
                {
                  menu_id: val.id,
                  id: 2,
                  text: 'Delete',
                  name: 'D',
                  menu: [3]
                }
              ]
            }
          } else if (val.name === 'Blacklist') {
            return {
              id: val.id,
              text: val.name,
              access: [
                {
                  menu_id: val.id,
                  id: 1,
                  text: 'Blacklist ( View, Create, Update )',
                  name: 'CRU',
                  menu: [0, 1, 2]
                },
                {
                  menu_id: val.id,
                  id: 2,
                  text: 'Delete',
                  name: 'D',
                  menu: [3]
                }
              ]
            }
          } else if (val.name === 'Penyelenggara') {
            return {
              id: val.id,
              text: val.name,
              access: [
                {
                  menu_id: val.id,
                  id: 1,
                  text: 'Penyelenggara ( View, Create, Update )',
                  name: 'CRU',
                  menu: [0, 1, 2]
                },
                {
                  menu_id: val.id,
                  id: 2,
                  text: 'Delete',
                  name: 'D',
                  menu: [3]
                }
              ]
            }
          } else if (val.name === 'Activity Log') {
            return {
              id: val.id,
              text: val.name,
              access: [
                {
                  menu_id: val.id,
                  id: 1,
                  text: 'Activity Log User ( View, Create, Update )',
                  name: 'CRU',
                  menu: [0, 1, 2]
                }
              ]
            }
          } else if (val.name === 'Kategori') {
            return {
              id: val.id,
              text: val.name,
              access: [
                {
                  menu_id: val.id,
                  id: 1,
                  text: 'Kategori ( View, Create, Update )',
                  name: 'CRU',
                  menu: [0, 1, 2]
                },
                {
                  menu_id: val.id,
                  id: 2,
                  text: 'Delete',
                  name: 'D',
                  menu: [3]
                }
              ]
            }
          } else if (val.name === 'Course') {
            return {
              id: val.id,
              text: val.name,
              access: [
                {
                  menu_id: val.id,
                  id: 1,
                  text: 'Course ( View, Create, Update )',
                  name: 'CRU',
                  menu: [0, 1, 2]
                },
                {
                  menu_id: val.id,
                  id: 2,
                  text: 'Delete',
                  name: 'D',
                  menu: [3]
                }
              ]
            }
          } else if (val.name === 'Update Data Penyelenggara') {
            return {
              id: val.id,
              text: val.name,
              access: [
                {
                  menu_id: val.id,
                  id: 1,
                  text: 'Update Data Penyelenggara ( View, Create, Update )',
                  name: 'CRU',
                  menu: [0, 1, 2]
                }
              ]
            }
          } else if (val.name === 'Kupon') {
            return {
              id: val.id,
              text: val.name,
              access: [
                {
                  menu_id: val.id,
                  id: 1,
                  text: 'Kupon ( View, Create, Update )',
                  name: 'CRU',
                  menu: [0, 1, 2]
                },
                {
                  menu_id: val.id,
                  id: 2,
                  text: 'Delete',
                  name: 'D',
                  menu: [3]
                }
              ]
            }
          } else if (val.name === 'Pengajuan Kupon') {
            return {
              id: val.id,
              text: val.name,
              access: [
                {
                  menu_id: val.id,
                  id: 1,
                  text: 'Pengajuan Kupon ( View, Create, Update )',
                  name: 'CRU',
                  menu: [0, 1, 2]
                },
                {
                  menu_id: val.id,
                  id: 2,
                  text: 'Delete',
                  name: 'D',
                  menu: [3]
                }
              ]
            }
          } else if (val.name === 'Banner') {
            return {
              id: val.id,
              text: val.name,
              access: [
                {
                  menu_id: val.id,
                  id: 1,
                  text: 'Banner ( View, Create, Update )',
                  name: 'CRU',
                  menu: [0, 1, 2]
                },
                {
                  menu_id: val.id,
                  id: 2,
                  text: 'Delete',
                  name: 'D',
                  menu: [3]
                }
              ]
            }
          } else {
            return {
              id: null
            }
          }
        })
      }
    }
    case GET_COMMAND_MENU_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error
      }
    case GET_COMMAND_LANGUAGE_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case GET_COMMAND_LANGUAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        languages: payload?.data.map(val => {
          return {
            id: val.id,
            text: val.name
          }
        })
      }
    case GET_COMMAND_LANGUAGE_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error
      }
    case GET_COMMAND_PRICE_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case GET_COMMAND_PRICE_SUCCESS:
      return {
        ...state,
        loading: false,
        prices: payload?.data.map(val => {
          return {
            id: val.id,
            text: val.name
          }
        })
      }
    case GET_COMMAND_PRICE_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error
      }
    case GET_COMMAND_ORGANIZER_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case GET_COMMAND_ORGANIZER_SUCCESS:
      return {
        ...state,
        loading: false,
        organizer: payload?.data.map(val => {
          return {
            id: val.id,
            text: val.name
          }
        })
      }
    case GET_COMMAND_ORGANIZER_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error
      }
    case GET_COMMAND_COUPON_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case GET_COMMAND_COUPON_SUCCESS:
      return {
        ...state,
        loading: false,
        coupon: payload?.data.map(val => {
          return {
            id: val.id,
            text: val.name
          }
        })
      }
    case GET_COMMAND_COUPON_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error
      }
    case GET_COMMAND_ROLES_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case GET_COMMAND_ROLES_SUCCESS:
      return {
        ...state,
        loading: false,
        roles: payload?.data.map(val => {
          return {
            id: val.id,
            text: val.name
          }
        })
      }
    case GET_COMMAND_ROLES_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error
      }
    case GET_COMMAND_CATEGORY_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case GET_COMMAND_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        category: payload?.data.map(val => {
          return {
            id: val.id,
            text: val.name
          }
        })
      }
    case GET_COMMAND_CATEGORY_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error
      }
    case GET_COMMAND_USER_LEVEL_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case GET_COMMAND_USER_LEVEL_SUCCESS:
      return {
        ...state,
        loading: false,
        userLevel: payload?.data.map(val => {
          return {
            id: val.id,
            text: val.name
          }
        })
      }
    case GET_COMMAND_USER_LEVEL_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error
      }
    case GET_COMMAND_USER_POSITION_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case GET_COMMAND_USER_POSITION_SUCCESS:
      return {
        ...state,
        loading: false,
        userPosition: payload?.data.map(val => {
          return {
            id: val.id,
            text: val.name
          }
        })
      }
    case GET_COMMAND_USER_POSITION_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error
      }
    case GET_COMMAND_USER_UNIT_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case GET_COMMAND_USER_UNIT_SUCCESS:
      return {
        ...state,
        loading: false,
        userUnit: payload?.data.map(val => {
          return {
            id: val.id,
            text: val.name
          }
        })
      }
    case GET_COMMAND_USER_UNIT_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error
      }
    case GET_COMMAND_CATEGORY_TOPIC_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case GET_COMMAND_CATEGORY_TOPIC_SUCCESS:
      return {
        ...state,
        categoryTopic: payload?.data.map(val => {
          return {
            id: val.id,
            text: val.name,
            pkasn: val.pkasn_program,
            topics: val.topic
          }
        })
      }
    case GET_COMMAND_CATEGORY_TOPIC_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error
      }
    case GET_COMMAND_COURSE_USER_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case GET_COMMAND_COURSE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        courseUser: payload?.data
      }
    case GET_COMMAND_COURSE_USER_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error
      }
    case GET_COMMAND_DURATION_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case GET_COMMAND_DURATION_SUCCESS:
      return {
        ...state,
        loading: false,
        courseDuration: payload?.data?.map(val => {
          return {
            id: val.id,
            text: val.name,
            value: val.id
          }
        })
      }
    case GET_COMMAND_DURATION_FAILED:
      return {
        ...state,
        loading: false,
        error: payload
      }
    case GET_NOTIFICATION_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case GET_NOTIFICATION_SUCCESS:
      return {
        ...state,
        loading: false,
        notification: payload?.data
      }
    case GET_NOTIFICATION_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error
      }
    case FILTER_COURSE_BY_PROVIDER_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case FILTER_COURSE_BY_PROVIDER_SUCCESS:
      return {
        ...state,
        loading: false,
        courseProvider: payload?.data?.map(val => {
          return {
            id: val.id,
            text: val.name
          }
        })
      }
    case FILTER_COURSE_BY_PROVIDER_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error
      }
    case GET_COMMAND_FILTER_COUPON_SUBMISSION_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case GET_COMMAND_FILTER_COUPON_SUBMISSION_SUCCESS:
      return {
        ...state,
        loading: false,
        couponSubmissionFilter: payload?.data?.map(val => {
          return {
            id: val.id,
            text: val.name
          }
        })
      }
    case GET_COMMAND_FILTER_COUPON_SUBMISSION_FAILED:
      return {
        ...state,
        loading: false,
        error: payload?.error
      }
    default:
      return state
  }
}