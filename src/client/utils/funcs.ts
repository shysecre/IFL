import { GetState } from "client/store";
import { Dispatch } from "react";
import {
  CurrentUserAction,
  CurrentUserActions,
} from "shared/types/currentUser";

export const refreshToken = (
  state: ReturnType<GetState>,
  dispatch: Dispatch<CurrentUserAction>
) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (Date.now() < state.currentUser.expiresIn) resolve(true);

      dispatch({
        type: CurrentUserActions.LOGIN_USER,
      });

      window.api.spotify.setRefreshToken(state.currentUser.refreshToken);

      const { body } = await window.api.spotify.refreshToken();
      const expiresIn = Date.now() + body.expires_in * 1000;

      window.api.spotify.setAccessToken(body.access_token);

      localStorage.setItem("accessToken", body.access_token);
      localStorage.setItem("expiresIn", `${expiresIn}`);

      dispatch({
        type: CurrentUserActions.LOGIN_USER_SUCCESS,
        payload: {
          accessToken: body.access_token,
          refreshToken: state.currentUser.refreshToken,
          expiresIn,
        },
      });

      resolve(true);
    } catch (err) {
      reject(err);
    }
  });
};
