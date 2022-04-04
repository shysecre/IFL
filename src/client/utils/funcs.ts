import { GetState } from "client/store";
import { loginUser } from "client/store/action-creators/currentUser";

export const refreshToken = (state: ReturnType<GetState>) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        state.currentUser.expiresIn &&
        Date.now() > state.currentUser.expiresIn
      ) {
        window.api.spotify.setRefreshToken(state.currentUser.refreshToken);
        const { body } = await window.api.spotify.refreshToken();
        loginUser({ accessToken: body.access_token });
      }

      resolve(true);
    } catch (err) {
      reject(err);
    }
  });
};
