import * as CurrentUserActionCreators from "./user";
import * as AppStateActionCreators from "./app";

export default {
  ...CurrentUserActionCreators,
  ...AppStateActionCreators,
};
