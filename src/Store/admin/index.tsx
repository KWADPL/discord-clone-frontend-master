import { combineReducers } from "redux";

import user from "./user";
import server from "./server";

const reducers = combineReducers({
  user,
  server
});

export default reducers;
