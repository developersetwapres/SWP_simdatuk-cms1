import CryptoJS from 'crypto-js'
import { getStorage, setStorages } from './storage'

// Caesar Cipher
export const setItem = (secret, key, value) => {
  const encrypted = crypt(secret, value)
  localStorage.setItem(key, encrypted)
}

export const getItem = (secret, key) => {
  const encrypted = localStorage.getItem(key)
  if (encrypted !== null) {
    return decrypt(secret, encrypted)
  } else {
    return null
  }
}

const crypt = (salt, text) => {
  const textToChars = (text) => text.split('').map((c) => c.charCodeAt(0))
  const byteHex = (n) => ('0' + Number(n).toString(16)).substr(-2)
  const applySaltToChar = (code) => textToChars(salt).reduce((a, b) => a ^ b, code)

  return text
    .split('')
    .map(textToChars)
    .map(applySaltToChar)
    .map(byteHex)
    .join('')
}

const decrypt = (salt, encoded) => {
  const textToChars = (text) => text.split('').map((c) => c.charCodeAt(0))
  const applySaltToChar = (code) => textToChars(salt).reduce((a, b) => a ^ b, code)
  return encoded
    .match(/.{1,2}/g)
    .map((hex) => parseInt(hex, 16))
    .map(applySaltToChar)
    .map((charCode) => String.fromCharCode(charCode))
    .join('')
}

// Encrypt Senstive data using AES
export const encryptItem = (secret, key, value) => {
  const encrypted = CryptoJS.AES.encrypt(value, secret).toString()
  setStorages([{ name: key, value: encrypted }])
}

// Decrypt 
export const decryptItem = (key, secret) => {
  let getEncrypt = getStorage(key)

  if (getEncrypt !== null) {
    let bytes = CryptoJS.AES.decrypt(getEncrypt, secret)
    let decrypted = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
    return decrypted
  }
}