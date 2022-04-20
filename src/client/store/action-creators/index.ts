import * as PlaylistActionCreators from "./playlist";
import * as CurrentUserActionCreators from "./currentUser";
import * as AppStateActionCreators from "./appState";

export default {
  ...PlaylistActionCreators,
  ...CurrentUserActionCreators,
  ...AppStateActionCreators,
};
