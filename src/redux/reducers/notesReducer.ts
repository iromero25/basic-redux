import {
  ADD_NOTE,
  REMOVE_NOTE,
  AddNoteAction,
  RemoveNoteAction,
  Note,
} from "../actions/actions";

const notesReducer = (notes: Note[] = [], action: AddNoteAction | RemoveNoteAction) => {
  switch (action.type) {
    case ADD_NOTE:
      const lastNote = notes.length > 0 ? notes[notes.length - 1] : notes[0];
      const lastNoteId = lastNote ? lastNote.id : 0;
      return [...notes, { ...action.payload, id: lastNoteId + 1 }];

    case REMOVE_NOTE:
      const { id } = action.payload;
      return notes.filter(note => note.id !== id);

    default:
      return notes;
  }
};

export default notesReducer;
