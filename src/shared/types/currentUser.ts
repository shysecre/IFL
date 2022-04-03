export interface CurrentUserState {
  accessToken: string | null;
  refreshToken: string | null;
  expiresIn: number | null;
  inLoginProccess?: boolean;
  error?: string;
}

export interface LoginUserSuccessResponse {
  refreshToken: string;
  accessToken: string;
  expiresIn: number;
}

export interface LoginUserAction {
  type: CurrentUserActions.LOGIN_USER;
}

export interface LoginUserSuccessAction {
  type: CurrentUserActions.LOGIN_USER_SUCCESS;
  payload: LoginUserSuccessResponse;
}

export interface LoginUserErrorAction {
  type: CurrentUserActions.LOGIN_USER_ERROR;
  payload: string;
}

export interface LogoutUserAction {
  type: CurrentUserActions.LOGOUT_USER;
}

export type CurrentUserAction =
  | LoginUserAction
  | LoginUserSuccessAction
  | LoginUserErrorAction
  | LogoutUserAction;

export enum CurrentUserActions {
  LOGIN_USER = "LOGIN_USER",
  LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS",
  LOGIN_USER_ERROR = "LOGIN_USER_ERROR",
  LOGOUT_USER = "LOGOUT_USER",
}
