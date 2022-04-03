import * as PlaylistActionCreators from "./playlist";
import * as CurrentUserActionCreators from "./currentUser";

export default {
  ...PlaylistActionCreators,
  ...CurrentUserActionCreators,
};
