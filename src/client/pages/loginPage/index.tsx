import { Button } from 'client/components/Button'
import { useActions } from 'client/hooks/useActions'
import React, { useEffect } from 'react'
import LoginPageProps from './index.props'
import styles from './index.module.css'
import classNames from 'classnames'
import { useTypedSelector } from 'client/hooks/useTypedSelector'
import SpotifyIcon from '../../../../public/icons/spotify.svg'

const LoginPage: React.FC<LoginPageProps> = () => {
  const { refreshToken, expiresIn } = useTypedSelector(state => state.user)
  const { loginUser } = useActions()

  const onClickLogin = () => {
    const url = window.api.spotify.createAuthUrl(
      [
        'playlist-modify-private',
        'playlist-modify-public',
        'user-read-currently-playing',
      ],
      'state'
    )

    window.api.server.createServer()
    window.api.utils.openInBrowser(url)

    loginUser({ req: true })
  }

  useEffect(() => {
    if (expiresIn && Date.now() > +expiresIn) {
      window.api.spotify.setRefreshToken(refreshToken)
      window.api.spotify.refreshToken().then(res => {
        loginUser({ accessToken: res.body.access_token })
      })
    }
  }, [location])

  return (
    <div className={classNames(styles.center)}>
      <div className={classNames(styles.holder)}>
        <div>
          <Button Icon={SpotifyIcon} onClick={onClickLogin}>
            Login with Spotify
          </Button>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
