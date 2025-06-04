import { getServerSideCookie } from '@/utils/cookie'

export const redirectFromServer = (res, location) => {
  res.writeHead(302, {
    Location: `${location}?expired=true`,
    'Content-Type': 'text/html; charset=utf-8'
  })
  res.end()
}

export async function authProps(ctx) {
  const token = getServerSideCookie(ctx, '_setneg_token')

  if (typeof token !== 'undefined') {
    const props = {
      isAuth: true
    }

    return { props }
  } else {
    const props = {
      isAuth: false
    }
    redirectFromServer(ctx.res, 'auth/login')
    return { props }
  }
}
