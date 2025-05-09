import ENV from '@libs/utils/env'

export const getConfigCookie: any = (
  hostname: string = ENV.MAIN_DOMAIN_NAME_FOR_COOKIE as string
) => {
  return {
    secure: ENV.APP_ENVIRONMENT !== 'development',
    sameSite: 'Strict',
    path: '/',
    expires: 30,
    domain: hostname,
  }
}

export const cookieKeys = {
  token: '_m_t',
  refreshToken: '_m_r_t',
}
