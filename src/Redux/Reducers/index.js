import { combineReducers } from "redux";
import engineerProjectList from "./Engineer/engineerProjectList";
import engineerProfile from "./Engineer/engineerProfile";
import engineerSkill from "./Engineer/engineerSkill";

const reducers = combineReducers({
  engineerProjectList,
  engineerProfile,
  engineerSkill

});

export default reducers;