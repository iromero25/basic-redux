import notesReducer from "./notesReducer";
import visibilityReducer from "./visibilityReducer";
import { combineReducers } from "redux";

const reducers = combineReducers({
  notes: notesReducer,
  visibility: visibilityReducer,
});

export default reducers;
