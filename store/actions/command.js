import {
  GET_COMMAND_TOPIC_REQUESTED,
  GET_COMMAND_COURSE_LEVEL_REQUESTED,
  GET_COMMAND_COURSE_CATEGORY_REQUESTED,
  GET_USER_ME_REQUESTED,
  UPDATE_PASSWORD_USER_ME_REQUESTED,
  GET_COMMAND_COURSES_REQUESTED,
  GET_COMMAND_MENU_REQUESTED,
  GET_COMMAND_LANGUAGE_REQUESTED,
  GET_COMMAND_PRICE_REQUESTED,
  GET_COMMAND_ORGANIZER_REQUESTED,
  GET_COMMAND_POSITION_REQUESTED,
  GET_COMMAND_COUPON_REQUESTED,
  GET_COMMAND_ROLES_REQUESTED,
  GET_COMMAND_CATEGORY_REQUESTED,
  GET_COMMAND_USER_LEVEL_REQUESTED,
  GET_COMMAND_USER_POSITION_REQUESTED,
  GET_COMMAND_USER_UNIT_REQUESTED,
  GET_COMMAND_CATEGORY_TOPIC_REQUESTED,
  GET_COMMAND_COURSE_USER_REQUESTED,
  GET_COMMAND_DURATION_REQUESTED,
  GET_NOTIFICATION_REQUESTED,
  FILTER_COURSE_BY_PROVIDER_REQUESTED,
  GET_COMMAND_FILTER_COUPON_SUBMISSION_REQUESTED,
  POST_NOTIFICATION_REQUESTED
} from '../constants'

/**
 * GET TOPIC 
 * 
 * 
 * @returns
 */
export const getCommandTopic = () => ({
  type: GET_COMMAND_TOPIC_REQUESTED
})

/**
 * GET LEVEL COURSE 
 * 
 */
export const getCourseLevel = () => ({
  type: GET_COMMAND_COURSE_LEVEL_REQUESTED
})

/**
 * GET COURSE CATEGORY
 */
export const getCourseCategory = () => ({
  type: GET_COMMAND_COURSE_CATEGORY_REQUESTED
})

/**
 * GET USER ME 
 */
export const getUserMe = () => ({
  type: GET_USER_ME_REQUESTED
})

/**
 * Update Password User Me 
 * 
 * @param {*} payload 
 */
export const updatePasswordMe = (payload) => ({
  type: UPDATE_PASSWORD_USER_ME_REQUESTED,
  payload: payload
})

/**
 * Get Command Courses
 * 
 * @param {*} payload
 */
export const getCommandCourses = (payload) => ({
  type: GET_COMMAND_COURSES_REQUESTED,
  payload: payload
})

/**
 * Get Command Menu
 * 
 */
export const getCommandMenu = () => ({
  type: GET_COMMAND_MENU_REQUESTED
})

/**
 * Get Command Language 
 * 
 * 
 */
export const getCommandLanguage = () => ({
  type: GET_COMMAND_LANGUAGE_REQUESTED
})

/**
 * Get Command Price
 */
export const getCommandPrice = () => ({
  type: GET_COMMAND_PRICE_REQUESTED
})

/**
 * Get Command Organizer 
 */
export const getCommandOrganizer = () => ({
  type: GET_COMMAND_ORGANIZER_REQUESTED
})

/**
 * Get Command Position
 */
export const getCommandPosition = () => ({
  type: GET_COMMAND_POSITION_REQUESTED
})

/**
 * Get command Coupon 
 * 
 */
export const getCommandCoupon = () => ({
  type: GET_COMMAND_COUPON_REQUESTED
})

/**
 * Get Command Roles
 */
export const getCommandRoles = () => ({
  type: GET_COMMAND_ROLES_REQUESTED
})

/**
 * Get Command Category 
 */
export const getCommandCategory = () => ({
  type: GET_COMMAND_CATEGORY_REQUESTED
})

/**
 * Get Command User Level
 */
export const getCommandUserLevel = () => ({
  type: GET_COMMAND_USER_LEVEL_REQUESTED
})

/**
 * Get Command User Position 
 */
export const getCommandUserPosition = () => ({
  type: GET_COMMAND_USER_POSITION_REQUESTED
})

/**
 * Get Command User Unit 
 */
export const getCommandUserUnit = () => ({
  type: GET_COMMAND_USER_UNIT_REQUESTED
})

/**
 * Get command Category Topic
 */
export const getCommandCategoryTopic = () => ({
  type: GET_COMMAND_CATEGORY_TOPIC_REQUESTED
})

/**
 * Get Command Course User 
 * 
 * @param {*} id 
 */
export const getCommandCourseUser = (id) => ({
  type: GET_COMMAND_COURSE_USER_REQUESTED,
  payload: id
})

/**
 * Get duration 
 * 
 * @returns
 */
export const getCommandCourseDuration = () => ({
  type: GET_COMMAND_DURATION_REQUESTED
})


/**
 * Get Notification
 * 
 * @returns
 */
export const getNotification = () => ({
  type: GET_NOTIFICATION_REQUESTED
})

/**
 * Post Notification 
 * 
 * @param {*} payload 
 * @returns
 */
export const postNotification = (payload) => ({
  type: POST_NOTIFICATION_REQUESTED,
  payload: payload
})

/**
 * Filter Course By Provider
 * 
 * @param {*} payload 
 * @returns
 */
export const filterCourseByProvider = (payload) => ({
  type: FILTER_COURSE_BY_PROVIDER_REQUESTED,
  payload: payload
})

/**
 * Get Command Filter COupon submission
 * 
 * @param {*} payload
 * @returns
 */
export const getCommandFilterCouponSubmission = (payload) => ({
  type: GET_COMMAND_FILTER_COUPON_SUBMISSION_REQUESTED,
  payload: payload
})