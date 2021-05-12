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

const initialState: Store = {
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
  // this is why `undefined` needs to  be  specified  as
  // part of the return types for the `visibilityReducer`
  visibility: undefined,
};

export default createStore(rootReducer, initialState);
