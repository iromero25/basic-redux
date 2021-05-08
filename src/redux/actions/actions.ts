export const ADD_NOTE = "ADD_NOTE";
export const FILTER_NOTE = "FILTER_NOTE";
export const REMOVE_NOTE = "REMOVE_NOTE";

export type ActionType = typeof ADD_NOTE | typeof FILTER_NOTE | typeof REMOVE_NOTE;
export type Note = { id: number, title: string; content: string; tag: string };
export type NoteId = { id: number };
export type Tag = { tag: TagValues };

export enum TagValues {
  showAll = "Show All",
  normal = "Normal",
  archived = "Archived",
  priority = "Priority",
}

export interface Action {
  type: ActionType;
  payload?: Note | NoteId | Tag;
}

// these are my action creators (which  are functions that  return an  object
// where the `type` attribute is expected and `payload` contains the optional
// data by convention)

export const addNote = (title: string, content: string, tag: TagValues): Action => ({
  type: ADD_NOTE,
  payload: {
    title,
    content,
    tag,
  },
});

export const removeNote = (id: number): Action => ({
  type: REMOVE_NOTE,
  payload: { id },
});

export const updateVisibility = (tag: TagValues): Action => ({
  type: FILTER_NOTE,
  payload: {
    tag,
  },
});
