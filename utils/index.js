/* eslint-disable indent */
import axios from 'axios'

/**
 *
 * Check if User have role
 *
 * @param {*} role
 * @param {*} payload
 * @returns
 */
export const onlyRole = (role, payload) => {
  const config = payload.map((v) => v.name)
  if (typeof config !== 'undefined') return config.indexOf(role) !== -1
}

/**
 *
 * Read File to Url
 *
 * @param {*} file
 */
export const readFile = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = function (e) {
      resolve(e.target.result)
    }
    reader.onerror = (err) => reject(err)
    reader.readAsDataURL(file)
  })

/**
 *
 * Get Media Type from base64
 *
 * @param {String} base64
 * @returns
 */
export const getMediaType = (base64 = '') => {
  const data = base64.split(':')
  const type = data[1].split('/')

  return type[0].toUpperCase()
}

/**
 *
 * Query Params URL
 *
 * @param {Number} page
 * @param {Number} limit
 * @param {String} sortBy
 * @param {Boolean} sortDesc
 * @param {String} search
 * @returns
 */
export const queryParams = (page, limit, search) => {
  return `?page=${page}&limit=${limit}&search=${search}`
}

/**
 *
 * Get File Extension
 *
 * @param {String} filename
 * @returns
 */
export const getFileExtension = (filename) => {
  return filename.substring(filename.lastIndexOf('.') + 1).toLowerCase()
}

/**
 *
 * Remove special characters
 *
 * @param {String} string
 * @returns
 */
export const removeSpecials = (string) => {
  return string.replace(/[^a-zA-Z0-9 ]/g, '')
}

/**
 *
 * Regex Email
 *
 * @param {*} email
 * @returns
 */
export const formatEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

/**
 * Format Date
 *
 * @param {*} date
 * @returns
 *
 */
export const dateTimeFormat = (date = '', subtract = null) => {
  const d = new Date(date)
  if (subtract !== null) {
    d.setDate(d.getDate() - subtract)

    // * Get Year
    const year = d.getFullYear()
    // * Get Month
    let month = '' + (d.getMonth() + 1)
    // * Get Day
    let day = '' + d.getDate()

    // * Get Hour
    let hour = '' + d.getHours()
    // * Get Minute
    let minute = '' + d.getMinutes()

    let second = '' + d.getSeconds()

    // * Check If Number Of Month 1 - 9 Add 0 to First
    if (month.length < 2) month = '0' + month
    // * Check If Number Of Day 1 - 9 Add 0 to First
    if (day.length < 2) day = '0' + day
    // check if number of hour 1-9 add 0 to first
    if (hour.length < 2) hour = '0' + hour
    // check if number of minute 1-9 add 0 to first
    if (minute.length < 2) minute = '0' + minute
    if (second.length < 2) second = '0' + second
    // * Join All Format to YYYY-MM-DD HH:mm
    const dateFormated =
      [day, month, year].join('-') + ' ' + [hour, minute, second].join(':')
    return dateFormated
  } else {
    // * Get Year
    const year = d.getFullYear()
    // * Get Month
    let month = '' + (d.getMonth() + 1)
    // * Get Day
    let day = '' + d.getDate()

    // * Get Hour
    let hour = '' + d.getHours()
    // * Get Minute
    let minute = '' + d.getMinutes()

    let second = '' + d.getSeconds()

    // * Check If Number Of Month 1 - 9 Add 0 to First
    if (month.length < 2) month = '0' + month
    // * Check If Number Of Day 1 - 9 Add 0 to First
    if (day.length < 2) day = '0' + day
    // check if number of hour 1-9 add 0 to first
    if (hour.length < 2) hour = '0' + hour
    // check if number of minute 1-9 add 0 to first
    if (minute.length < 2) minute = '0' + minute
    if (second.length < 2) second = '0' + second
    // * Join All Format to YYYY-MM-DD HH:mm
    const dateFormated =
      [day, month, year].join('-') + ' ' + [hour, minute, second].join(':')
    return dateFormated
  }
}

/**
 * Format Date yyyy-mm-dd
 *
 * @param {*} date
 * @returns
 */
export const formatDate = (date) => {
  let d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear()

  if (month.length < 2) month = '0' + month
  if (day.length < 2) day = '0' + day

  return [day, month, year].join('-')
}

/**
 * Capitalize first letter
 *
 * @param {*} string
 * @returns
 */
export const capitalizeFirstLetter = string =>
  string.charAt(0).toUpperCase() + string.slice(1)

/**
 * Get blob from url
 *
 * @param {*} url
 * @returns
 */
export const getBlobFromUrl = async (url) => {
  const res = await axios.get(url, {
    responseType: 'blob'
  })

  return res?.data
}

/**
 * Convert dd-mm-yyyy to yyyy-mm-dd
 *
 * @param {*} date
 * @returns
 */
export const dmyToYmd = (dateDMY) => {
  if (!date) return '1970-10-10'

  const date = dateDMY?.split('-')
  const result = `${date[2]}-${date[1]}-${date[0]}`
  return result
}