import { combineReducers, createStore } from "redux";
import notesReducer from "../reducers/notesReducer";
import visibilityReducer from "../reducers/visibilityReducer";
import { TagValues } from "../actions/actions";

// export interface Store {
//   notes: Note[];
//   visibility: TagValues;
// }

const rootReducer = combineReducers({
  notes: notesReducer,
  visibility: visibilityReducer,
});

export type Store = ReturnType<typeof rootReducer>;

const initialState = {
  notes: [
    {
      id: 1,
      title: "You are awesome",
      content: "No, wait, I meant legendary!",
      tag: TagValues.normal,
    },
    {
      id: 2,
      title: "Ooops",
      content: "I was talking to myself",
      tag: TagValues.normal,
    },
  ],
  visibility: undefined,
};

export default createStore(rootReducer, initialState as any); // I still have the problem typing the intitial state
