import env from '@libs/utils/env'

export default {
  user: {
    login: `${env.API_URL}/user/login`,
    register: `${env.API_URL}/user/register`,
    me: `${env.API_URL}/user/me`,
  },
  note: {
    base: `${env.API_URL}/note`,
    list: `${env.API_URL}/note/list`,
    byId: (id: number) => `${env.API_URL}/note/${id}`,
  },
  label: {
    base: `${env.API_URL}/label`,
    byId: (id: number) => `${env.API_URL}/label/${id}`,
  },
}
