import { MockMethod } from 'vite-plugin-mock'
import { resultError, resultSuccess, getRequestToken, requestParams } from '../_util'

export function createFakeUserList() {
  return [
    { userId: '1', username: 'admin', password: '123' },
    { userId: '2', username: 'user1', password: '123' }
  ]
}

export default [
  // mock user login
  {
    url: '/basic-api/login',
    timeout: 200,
    method: 'post',
    response: ({ body }) => {
      const { username, password } = body
      const checkUser = createFakeUserList().find(
        (item) => item.username === username && item.password === password
      )
      if (!checkUser) {
        return resultError('Incorrect account or password！')
      }
      const { userId, username: _username } = checkUser
      return resultSuccess({ userId, username: _username })
    }
  },
  {
    url: '/basic-api/userInfo',
    method: 'get',
    response: (request: requestParams) => {
      console.log('----请求了getUserInfo---', request)
      return resultSuccess({ name: 'admin', age: 20 })
    }
  },
  {
    url: '/basic-api/logout',
    timeout: 200,
    method: 'get',
    response: (request: requestParams) => {
      const token = getRequestToken(request)
      if (!token) return resultError('Invalid token')
      return resultSuccess(undefined, { message: 'Token has been destroyed' })
    }
  }
] as MockMethod[]
