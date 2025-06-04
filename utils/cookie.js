import { useCookie } from 'next-cookie'

export const configureCookie = (name, value, expired) => {
  const subtract = new Date()
  const year = subtract.getFullYear()
  const month = subtract.getMonth()
  const day = subtract.getDate()

  const date = new Date(year + 1, month, day)

  const time = date.getTime()
  const expireTime = time + 1000 * 3600 * expired
  date.setTime(expireTime)

  document.cookie = `${name}=${value};expires=${date.toGMTString()};path=/`
}

export const setCookies = (cookies) => {
  cookies.map((item) => configureCookie(item.name, item.value, 1))
}

export const getServerSideCookie = (ctx, key) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const nextCookie = useCookie(ctx)
  return nextCookie.cookie.cookies[key]
}

export const getClientSideCookie = (key) => {
  const name = `${key}=`
  const decode = decodeURIComponent(document.cookie)
  const cookie = decode.split(';')

  for (let i = 0; i < cookie.length; i++) {
    let c = cookie[i]
    while (c.charAt(0) === ' ') {
      c = c.substring(1)
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length)
    }
  }
  return null
}


export const clearCookie = (cookies) => {
  cookies.map((item) => configureCookie(item, null, -1))
}