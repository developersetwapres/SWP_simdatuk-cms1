import {
  AUTHENTICATION_REQUESTED,
  UPDATE_PASSWORD_REQUESTED,
  FORGET_PASSWORD_REQUESTED,
  UPDATE_PROFILE_REQUESTED,
  AUTHENTICATION_LOGOUT_REQUESTED,
  GET_HASH_URL_PASSWORD_REQUESTED,
  RESET_PASSWORD_REQUESTED,
  AUTHENTICATION_QR_REQUESTED,
  GET_PROFILE_REQUESTED,
  NEW_PASSWORD_REQUESTED
} from '../constants'

/**
 * Authentication Requested
 * @param {*} payload
 * @returns
 */
export const authenticationAction = (payload) => ({
  type: AUTHENTICATION_REQUESTED,
  payload: payload
})

/**
 * Authentcation QR Code
 *
 * @param {*} payload
 * @returns
 */
export const authenticationQrCodeAction = (payload) => ({
  type: AUTHENTICATION_QR_REQUESTED,
  payload: payload
})

/**
 * Logout Reqeusted
 *
 * @returns
 */
export const AuthenticationLogout = () => ({
  type: AUTHENTICATION_LOGOUT_REQUESTED
})

/**
 * Update Password
 *
 * @param {*} payload
 * @returns
 */
export const updatePassword = (payload) => ({
  type: UPDATE_PASSWORD_REQUESTED,
  payload: payload
})

/**
 * Forget Password
 *
 * @param {*} payload
 * @returns
 */
export const forgetPassword = (payload) => ({
  type: FORGET_PASSWORD_REQUESTED,
  payload: payload
})

/**
 * Get Profile
 *
 * @returns
 */
export const getProfile = () => ({
  type: GET_PROFILE_REQUESTED
})

/**
 * Update Profile
 *
 * @param {*} payload
 * @returns
 */
export const updateProfile = (payload) => ({
  type: UPDATE_PROFILE_REQUESTED,
  payload: payload
})

/**
 * Get Hash of password
 *
 * @param {*} payload
 * @returns
 */
export const getHashUrlPassword = (payload) => ({
  type: GET_HASH_URL_PASSWORD_REQUESTED,
  payload: payload
})

/**
 * Reset Password
 *
 * @param {*} payload
 * @returns
 */
export const resetPassword = (payload) => ({
  type: RESET_PASSWORD_REQUESTED,
  payload: payload
})

/**
 * New Password
 *
 * @param {*} payload
 * @returns
 */
export const newPassword = (payload) => ({
  type: NEW_PASSWORD_REQUESTED,
  payload: payload
})
