import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { Store } from "../redux/store/store";
import { TagValues, removeNote, updateVisibility } from "../redux/actions/actions";

const mapStateToProps = (state: Store) => ({
  notes: state.notes,
  visibility: state.visibility,
});

const mapDispatchToProps = {
  removeNote,
  updateVisibility,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;

// I know we are mapping state (and dispatch) to props and thus we don't
// necessarily pass any props down from this component's parent, but we
// still have to specify the props parameter so we can reference it  in
// the code!
const AllNotes: React.FC<ReduxProps> = ({
  notes,
  visibility,
  removeNote,
  updateVisibility,
}) => {
  const tagValues = Object.values(TagValues);
  const notesToDisplay =
    visibility === TagValues.showAll
      ? notes
      : notes.filter(note => note.tag === visibility);

  return (
    <>
      <h3>All Notes</h3>
      <ul>
        {notesToDisplay.map((note, index) => (
          <li key={index} style={{ marginBottom: 8 }}>
            <b>{note.title}</b>
            <button onClick={() => removeNote(note.id)} style={{ marginLeft: 5 }}>
              x
            </button>
            <br />
            <span>{note.content}</span>
            <br />
            <span>{`tag: ${note.tag}`}</span>
          </li>
        ))}
      </ul>
      <div>
        <h3>Filter notes</h3>
        <select
          name="tag"
          onChange={e => updateVisibility(e.target.value as TagValues)}
        >
          {tagValues.map((tag, index) => (
            <option key={index} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default connector(AllNotes);
