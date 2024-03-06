/**
 * Is Valid Url ? 
 * 
 * @param {*} urlString
 * @returns
 */
export const isValidUrl = urlString => {
  let url
  try {
    url = new URL(urlString)
  } catch (err) {
    return false
  }
  return url.protocol === 'http:' || url.protocol === 'https:'
}

/**
 * Regex not allowed character / symbol and word
 * 
 * @param {Number} num 
 * @returns
 */
export const notAllowedCharAndWord = (num) => {
  const regex = /^[0-9]*$/g
  return regex.test(num)
}

/**
 * Regex not allowedChar
 * 
 * @param {*} request 
 * @returns
 */
export const notAllowedChar = (request) => {
  const regex = /^[0-9!@#$%^&*()_+]*$/g
  return regex.test(request)
}

/**
 * Special Chars 
 * 
 * @param {String} search 
 * @returns
 */
export const specialChars = search => search.replace(/(&#(\d+);)/g, (match, capture, charCode) =>
  String.fromCharCode(charCode))


/**
  * Regex Tag Img 
  * 
  * @param {*} value
  * @returns
  */
export const regexImage = (value) => {
  const regex = /<p><img.*? src = "(.*?)"[^\>]+>/g
  return regex.test(value)
}

/**
 * Regex Contains one number, one Uppercase, one lowercase, one symbol and anything
 * 
 * @param {string} password 
 * @returns
 */
export const regexPassword = (password) => {
  const regx = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')
  return regx.test(password)
}

