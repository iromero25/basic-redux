import { ADD_NOTE, REMOVE_NOTE, Action, Note, NoteId } from "../actions/actions";

const notesReducer = (notes: Note[] = [], action: Action) => {
  switch (action.type) {
    case ADD_NOTE:
      const lastNote = notes.length > 0 ? notes[notes.length - 1] : notes[0];
      const lastNoteId = lastNote ? lastNote.id : 0;
      return [...notes, { ...action.payload, id: lastNoteId + 1 }];

    case REMOVE_NOTE:
      const { id } = action.payload as NoteId;
      return notes.filter(note => note.id !== id);

    default:
      return notes;
  }
};

export default notesReducer;
