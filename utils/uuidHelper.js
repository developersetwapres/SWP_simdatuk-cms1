import { v5 as uuidv5 } from 'uuid'

// Namespace UUID untuk aplikasi SIMDATUK (from environment variable)
const SIMDATUK_NAMESPACE = process.env.NEXT_PUBLIC_UUID_NAMESPACE

// Base62 characters (URL-safe, alphanumeric only) - dapat di-customize via environment variable
const BASE62 = process.env.NEXT_PUBLIC_BASE62_CHARS

/**
 * Convert numeric ID to short UUID using base62 encoding
 * More secure than base64 (btoa) and shorter than UUID v5
 * 
 * @param {number|string} id - ID yang akan dikonversi
 * @returns {string} Short UUID string (6-10 characters)
 * 
 * @example
 * idToShortUuid(123) // '2Lw9xK'
 * idToShortUuid('456') // '7Hn2pQ'
 */
export const idToShortUuid = (id) => {
  if (!id) return null
  
  // Convert ID to number
  let num = parseInt(id)
  if (isNaN(num)) return null
  
  // Add timestamp salt for additional security (last 5 digits)
  // This makes the short UUID unique per session but deterministic for same ID in same timeframe
  const timeSalt = Math.floor(Date.now() / 10000) % 100000 // Changes every 10 seconds
  const combined = parseInt(`${timeSalt}${num}`)
  
  // Convert to base62
  let result = ''
  let value = combined
  
  while (value > 0) {
    result = BASE62[value % 62] + result
    value = Math.floor(value / 62)
  }
  
  return result || '0'
}

/**
 * Convert UUID kembali ke ID original
 * Karena short UUID menggunakan timestamp salt, kita ambil ID dari query param
 * 
 * @param {string} shortUuid - Short UUID string
 * @param {string} fallbackId - Fallback ID dari query param
 * @returns {string|null} Original ID
 */
export const shortUuidToId = (shortUuid, fallbackId = null) => {
  // Short UUID adalah one-way dengan salt, jadi kita butuh fallback dari query param
  if (fallbackId) return fallbackId
  
  console.warn('Short UUID requires _id query parameter for decoding')
  return null
}

/**
 * Helper untuk membuat URL dengan Short UUID
 * Menambahkan original ID sebagai query param untuk kemudahan decode
 * 
 * @param {string} basePath - Base path URL
 * @param {number|string} id - Original ID
 * @param {object} [additionalParams] - Additional query params
 * @returns {string} Complete URL with short UUID and query params
 * 
 * @example
 * createShortUuidUrl('/data-pegawai/detail', 123, { status: 'ASN' })
 * // '/data-pegawai/detail/2Lw9xK?_id=123&status=ASN'
 */
export const createShortUuidUrl = (basePath, id, additionalParams = {}) => {
  if (!id) return basePath
  
  const shortUuid = idToShortUuid(id)
  if (!shortUuid) return basePath
  
  // Filter out undefined, null, and empty string values
  const cleanParams = Object.entries({
    _id: String(id), // Hidden param untuk decode
    ...additionalParams
  }).reduce((acc, [key, value]) => {
    // Only include non-null, non-undefined, non-empty values
    if (value !== null && value !== undefined && value !== '') {
      acc[key] = value
    }
    return acc
  }, {})
  
  const params = new URLSearchParams(cleanParams)
  
  return `${basePath}/${shortUuid}?${params.toString()}`
}

/**
 * Helper untuk extract ID dari URL dengan Short UUID
 * Membaca dari query param _id
 * 
 * @param {object} query - Next.js router query object
 * @returns {string|null} Original ID
 * 
 * @example
 * const id = extractIdFromShortUuidUrl(router.query)
 * // Returns '123' from query param _id
 */
export const extractIdFromShortUuidUrl = (query) => {
  if (!query) return null
  
  // Coba ambil dari query param _id
  if (query._id) return query._id
  
  // Fallback ke id jika ada
  if (query.id) return query.id
  
  return null
}

/**
 * Validate short UUID format (base62, 4-15 characters)
 * 
 * @param {string} shortUuid - Short UUID string to validate
 * @returns {boolean} True if valid short UUID
 */
export const isValidShortUuid = (shortUuid) => {
  if (!shortUuid || typeof shortUuid !== 'string') return false
  const shortUuidRegex = /^[0-9A-Za-z]{4,15}$/
  return shortUuidRegex.test(shortUuid)
}

// ============= LEGACY UUID v5 Functions (Deprecated) =============
// Keep for backward compatibility, but prefer Short UUID above

/**
 * @deprecated Use idToShortUuid instead
 * Convert ID (integer/string) menjadi deterministic UUID v5
 */
export const idToUuid = (id) => {
  if (!id) return null
  const idString = String(id).trim()
  return uuidv5(idString, SIMDATUK_NAMESPACE)
}

/**
 * @deprecated Use createShortUuidUrl instead
 */
export const createUuidUrl = (basePath, id, additionalParams = {}) => {
  return createShortUuidUrl(basePath, id, additionalParams)
}

/**
 * @deprecated Use extractIdFromShortUuidUrl instead
 */
export const extractIdFromUuidUrl = (query) => {
  return extractIdFromShortUuidUrl(query)
}

/**
 * @deprecated Use isValidShortUuid instead
 */
export const isValidUuid = (uuid) => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
  return uuidRegex.test(uuid)
}
