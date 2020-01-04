import { combineReducers } from "redux";
import engineerProjectList from "./Engineer/Project/engineerProjectList";
import engineerProfile from "./Engineer/Profile/engineerProfile";
import engineerSkill from "./Engineer/Profile/engineerSkill";
import assignedProject from "./Company/Project/engineerProjectList";


const reducers = combineReducers({
  engineerProjectList,
  engineerProfile,
  engineerSkill,
  assignedProject,
});

export default reducers;