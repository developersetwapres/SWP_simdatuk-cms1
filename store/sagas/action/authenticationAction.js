import { post, patch, get } from '@/utils/interceptors'

/**
 *
 * Authentication
 *
 * @param {*} payload
 * @return
 */
export const authenticationPost = (payload) => {
  return post(`/login`, payload)
}

/**
 * Authentication QR Code
 *
 * @param {*} payload
 * @returns
 */
export const authenticationQrCodeAction = (payload) => {
  return post(`/auth/admin/2fa/generate`, payload)
}

/**
 * Update Password
 *
 * @param {*} payload
 * @returns
 */
export const updatePasswordAction = (payload) => {
  return patch(`/auth/me/password`, payload)
}

/**
 * Route Forget Password
 *
 * @param {*} payload
 * @returns
 */
export const forgetPasswordAction = (payload) => {
  return post(`/forgot-password`, payload)
}

/**
 * Get Profile
 *
 * @returns
 */
export const getProfileAction = () => {
  return get('/profile')
}

/**
 * Update Profile
 *
 * @param {*} payload
 * @returns
 */
export const updateProfileAction = (payload) => {
  return post(`/profile`, payload)
}

/**
 * Auth Logout
 *
 * @returns
 */
export const authenticationLogoutAction = () => {
  return get(`/auth/logout`)
}

/**
 * Get Hash of Url
 *
 * @param {*} payload
 * @returns
 */
export const getHashUrlPasswordAction = (payload) => {
  return get(`/auth/reset/password?hash=${payload}`)
}

/**
 * Reset Password
 *
 * @param {*} payload
 * @returns
 */
export const resetPasswordAction = (payload) => {
  return post(`/reset-password`, payload)
}

/**
 * New Password
 *
 * @param {*} payload
 * @returns
 */
export const newPasswordAction = (payload) => {
  return post(`/new-password`, payload)
}
