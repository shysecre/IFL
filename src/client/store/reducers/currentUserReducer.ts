import {
  CurrentUserAction,
  CurrentUserActions,
  CurrentUserState,
} from "shared/types/currentUser";

const initialState: CurrentUserState = {
  expiresIn: new Date(+localStorage.getItem("expiresIn")).getTime(),
  refreshToken: localStorage.getItem("refreshToken"),
  accessToken: localStorage.getItem("accessToken"),
  error: null,
  inLoginProccess: false,
};

export const currentUserReducer = (
  state = initialState,
  action: CurrentUserAction
): CurrentUserState => {
  switch (action.type) {
    case CurrentUserActions.LOGIN_USER:
      return { ...state, inLoginProccess: true };

    case CurrentUserActions.LOGIN_USER_SUCCESS:
      return { ...state, ...action.payload, inLoginProccess: false };

    case CurrentUserActions.LOGIN_USER_ERROR:
      return { ...state, error: action.payload, inLoginProccess: false };

    case CurrentUserActions.LOGOUT_USER:
      return {
        ...state,
        expiresIn: null,
        refreshToken: null,
        accessToken: null,
      };

    case CurrentUserActions.CLEAR_ERROR:
      return { ...state, error: "" };

    default:
      return state;
  }
};
