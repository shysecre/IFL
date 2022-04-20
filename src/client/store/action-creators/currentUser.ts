import { Dispatch } from "redux";
import { GetState } from "client/store";
import {
  CurrentUserAction,
  CurrentUserActions,
} from "shared/types/currentUser";
import axios from "axios";

interface options {
  req?: boolean;
  code?: string;
  accessToken?: string;
}

export const logoutUser = () => {
  return async (dispatch: Dispatch<CurrentUserAction>) => {
    dispatch({
      type: CurrentUserActions.LOGOUT_USER,
    });

    const items = ["expiresIn", "refreshToken", "accessToken"];
    items.map(item => localStorage.removeItem(item));
  };
};

export const clearUserError = () => {
  return async (dispatch: Dispatch<CurrentUserAction>) => {
    dispatch({
      type: CurrentUserActions.CLEAR_ERROR,
    });
  };
};

const getCodeRec = async (
  dispatch: Dispatch<CurrentUserAction>,
  code?: string
) => {
  if (code) {
    let body: {
      access_token: string;
      expires_in: number;
      refresh_token: string;
    };

    body = (await window.api.spotify.authCodeGrant(code)).body;

    window.api.spotify.setAccessToken(body.access_token);
    window.api.spotify.setRefreshToken(body.refresh_token);

    localStorage.setItem("expiresIn", `${Date.now() + body.expires_in * 1000}`);
    localStorage.setItem("refreshToken", body.refresh_token);
    localStorage.setItem("accessToken", body.access_token);

    dispatch({
      type: CurrentUserActions.LOGIN_USER_SUCCESS,
      payload: {
        accessToken: body.access_token,
        expiresIn: +localStorage.getItem("expiresIn"),
        refreshToken: body.refresh_token,
      },
    });
  }

  setTimeout(async () => {
    const res = await axios.get("http://localhost:8080/getCode");

    getCodeRec(dispatch, res.data.code);
  }, 500);
};

export const loginUser = ({ code, accessToken, req }: options) => {
  return async (dispatch: Dispatch<CurrentUserAction>, getState: GetState) => {
    try {
      dispatch({
        type: CurrentUserActions.LOGIN_USER,
      });

      if (req) {
        return getCodeRec(dispatch);
      } else {
        let body: {
          access_token: string;
          expires_in: number;
          refresh_token: string;
        };

        if (code) {
          body = (await window.api.spotify.authCodeGrant(code)).body;
        } else {
          const state = getState();

          body = {
            access_token: accessToken,
            expires_in: 3600,
            refresh_token: state.currentUser.refreshToken,
          };
        }

        window.api.spotify.setAccessToken(body.access_token);
        window.api.spotify.setRefreshToken(body.refresh_token);

        localStorage.setItem(
          "expiresIn",
          `${Date.now() + body.expires_in * 1000}`
        );
        localStorage.setItem("refreshToken", body.refresh_token);
        localStorage.setItem("accessToken", body.access_token);

        dispatch({
          type: CurrentUserActions.LOGIN_USER_SUCCESS,
          payload: {
            accessToken: body.access_token,
            expiresIn: +localStorage.getItem("expiresIn"),
            refreshToken: body.refresh_token,
          },
        });
      }
    } catch (err) {
      dispatch({
        type: CurrentUserActions.LOGIN_USER_ERROR,
        payload: err.message,
      });

      setTimeout(() => {
        dispatch({
          type: CurrentUserActions.CLEAR_ERROR,
        });
      }, 7500);
    }
  };
};
