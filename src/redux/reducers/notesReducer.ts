import { ADD_NOTE, REMOVE_NOTE, Action, Note, NoteId } from "../actions/actions";

const notesReducer = (notes: Note[] = [], action: Action) => {
  switch (action.type) {
    case ADD_NOTE:
      // const { title, content } = action.payload as Note;
      return [...notes, { ...action.payload }];

    case REMOVE_NOTE:
      const { id } = action.payload as NoteId;
      return notes.filter((_note: Note, index: number) => index !== id);

    default:
      return notes;
  }
};

export default notesReducer;
