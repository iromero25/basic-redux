import { createStore } from "redux";
import { Note, TagValues } from "../actions/actions";
import reducers from "../reducers/reducers";

export interface Store {
  notes: Note[];
  visibility: TagValues;
}

const initialState: Partial<Store> = {
  notes: [
    {
      title: "You are awesome",
      content: "No, wait, I meant legendary!",
      tag: TagValues.normal,
    },
    { title: "Ooops", content: "I was talking to myself", tag: TagValues.normal },
  ],
};

export default createStore(reducers, initialState as any); // I need to avoid typing it as any
