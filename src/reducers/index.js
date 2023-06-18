import { combineReducers } from "redux";
import authReducer from "./authReducers";
import adminReducer from "./adminReducers";
const rootReducer = combineReducers({
  admin: adminReducer,
  auth: authReducer,
});
export default rootReducer;
