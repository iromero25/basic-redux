import React, { useState, useRef } from "react";
import { connect } from "react-redux";
import { Action, TagValues, addNote } from "../redux/actions/actions";

interface Props {
  addNote: (title: string, content: string, tag: TagValues) => Action;
}

const elementWidth = 160;

const NoteForm: React.FC<Props> = props => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState<TagValues>(TagValues.normal);
  const titleRef = useRef<HTMLInputElement>(null);

  // interface Event {
  //   preventDefault: () => void;
  // }

  // add the note by dispathcing the `addNote` action (using the addNote
  // action creator). I believe there's another way to handle this
  const handleSubmission = (
    e: React.FormEvent<HTMLFormElement> /* alternative: e: Event */
  ) => {
    e.preventDefault();
    props.addNote(title, content, tag);
    setTitle("");
    setContent("");

    // set focus to the Input DOM element this reference points at
    titleRef.current?.focus();
  };

  const tagValues = Object.values(TagValues).filter(
    key => key !== TagValues.showAll
  );

  return (
    <>
      <h3>Add a Note</h3>
      <form onSubmit={handleSubmission}>
        Title: <br />
        <input
          type="text"
          name="title"
          ref={titleRef}
          value={title}
          style={{ width: elementWidth }}
          onChange={e => setTitle(e.target.value)}
        />
        <br />
        Content: <br />
        <textarea
          name="content"
          value={content}
          style={{ width: elementWidth * 1.5, height: 90 }}
          onChange={e => setContent(e.target.value)}
        ></textarea>
        <br />
        <div>
          <label htmlFor="tags">Tag:</label>
          <select
            name="tag"
            id="tags"
            onChange={e => setTag(e.target.value as TagValues)}
            style={{ marginLeft: 5 }}
          >
            {tagValues.map((tag, index) => (
              <option key={index} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </div>
        <br />
        <button type="submit" style={{ marginBottom: 5 }}>
          Add Note
        </button>
      </form>
    </>
  );
};

const mapDispatchToProps = {
  addNote: addNote,
};

// `connect` is a Higher Order Component (Function?) that returns
// a function that in turn, takes another Component as parameter.
// a HOC is a pure function
export default connect(
  null, // mapStateToProps is null, we don’t care about what’s in the store
  mapDispatchToProps
)(NoteForm);
