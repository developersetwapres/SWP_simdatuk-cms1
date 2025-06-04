/**
 * 
 * allowedNumber
 * 
 * @param {*} price
 * @returns 
 */

export const allowedNumber = (price) => {
  const regex = /^[1-9]+$/
  return price.match(regex)
}

/**
 * 
 * Format Rupiah 
 * this function required to passing parameter and then will return format in rupiah
 * example: Rp.20.000,00
 * 
 * @param {*} price 
 * @returns 
 */
export const formatRupiah = (price) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(price)
}