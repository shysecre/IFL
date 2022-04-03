import Button from "client/components/Button";
import { useActions } from "client/hooks/useActions";
import React, { useEffect } from "react";
import LoginPageProps from "./index.props";
import styles from "./index.module.css";
import classNames from "classnames";
import { useTypedSelector } from "client/hooks/useTypedSelector";

const LoginPage: React.FC<LoginPageProps> = () => {
  const { refreshToken, expiresIn } = useTypedSelector(
    state => state.currentUser
  );
  const { loginUser } = useActions();

  const onClickLogin = () => {
    const url = window.api.spotify.createAuthUrl(
      [
        "playlist-modify-private",
        "playlist-modify-public",
        "user-read-currently-playing",
      ],
      "state"
    );

    window.api.spotify.createServer();
    window.api.spotify.openInBrowser(url);

    loginUser({ req: true });
  };

  useEffect(() => {
    if (expiresIn && Date.now() > +expiresIn) {
      window.api.spotify.setRefreshToken(refreshToken);
      window.api.spotify.refreshToken().then(res => {
        loginUser({
          accessToken: res.body.access_token,
        });
      });
    }
  }, [location]);

  return (
    <div className={classNames(styles.center)}>
      <div className={classNames(styles.holder)}>
        <div>
          <img
            className={classNames(styles.img)}
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Spotify_icon.svg/512px-Spotify_icon.svg.png?20191006032433"
            width={52}
            height={52}
          />
        </div>
        <div>
          <Button
            color={"green"}
            onClick={onClickLogin}
            text="Login with Spotify"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
