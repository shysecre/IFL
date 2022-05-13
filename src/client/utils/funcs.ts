import { GetState } from 'client/store'
import { Dispatch } from 'react'
import { userAction, userActions } from 'shared/types/user'

export const refreshToken = (
  state: ReturnType<GetState>,
  dispatch: Dispatch<userAction>
) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (Date.now() < state.user.expiresIn) resolve(true)

      window.api.spotify.setRefreshToken(state.user.refreshToken)

      const { body } = await window.api.spotify.refreshToken()
      const expiresIn = Date.now() + body.expires_in * 1000

      window.api.spotify.setAccessToken(body.access_token)

      localStorage.setItem('accessToken', body.access_token)
      localStorage.setItem('expiresIn', `${expiresIn}`)

      dispatch({
        type: userActions.LOGIN_USER_SUCCESS,
        payload: {
          accessToken: body.access_token,
          refreshToken: state.user.refreshToken,
          expiresIn,
        },
      })

      resolve(true)
    } catch (err) {
      reject(err)
    }
  })
}
