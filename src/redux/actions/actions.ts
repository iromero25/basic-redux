import { Action } from "redux";

export const ADD_NOTE = "ADD_NOTE";
export const FILTER_NOTE = "FILTER_NOTE";
export const REMOVE_NOTE = "REMOVE_NOTE";

export type Note = { id: number; title: string; content: string; tag: string };
export type NoteId = { id: number };
export type Tag = { tag: TagValues };

export enum TagValues {
  showAll = "Show All",
  normal = "Normal",
  archived = "Archived",
  priority = "Priority",
}

export interface AddNoteAction extends Action<typeof ADD_NOTE> {
  payload: Omit<Note, "id">;
}

export interface FilterNoteAction extends Action<typeof FILTER_NOTE> {
  payload: Tag;
}

export interface RemoveNoteAction extends Action<typeof REMOVE_NOTE> {
  payload: NoteId;
}

export const addNote = (
  title: string,
  content: string,
  tag: TagValues
): AddNoteAction => ({
  type: ADD_NOTE,
  payload: {
    title,
    content,
    tag,
  },
});

export const removeNote = (id: number): RemoveNoteAction => ({
  type: REMOVE_NOTE,
  payload: { id },
});

export const updateVisibility = (tag: TagValues): FilterNoteAction => ({
  type: FILTER_NOTE,
  payload: {
    tag,
  },
});
