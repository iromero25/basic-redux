import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../redux/store/store";
import App from "./App";

import "@testing-library/jest-dom";
import { TagValues } from "../redux/actions/actions";

const Wrapper: React.FC = ({ children }) => (
  <Provider store={store}>{children}</Provider>
);

test("AllNotes is re-rendered with the content in NoteForm after the 'Add Note' button is clicked", () => {
  const { getByText, getByLabelText, queryByText } = render(
    <Wrapper>
      <App />
    </Wrapper>
  );

  const addedTitle = "Do the laundry";
  const addedContent = "I have lots of dirty clothes";
  const addedTag = TagValues.priority;
  expect(queryByText(addedTitle)).not.toBeInTheDocument;

  fireEvent.change(getByLabelText(/title/i), { target: { value: addedTitle } });
  fireEvent.change(getByLabelText(/content/i), { target: { value: addedContent } });
  fireEvent.change(getByLabelText(/tag/i), { target: { value: addedTag } });

  // dispath the action adding a new Note into the DOM by clicking on the
  // button provided in the UI; the same way a user would
  const addNoteButton = getByText("Add Note");
  fireEvent.click(addNoteButton);

  expect(getByText(addedTitle)).toBeInTheDocument();
  expect(getByText(addedContent)).toBeInTheDocument();
  expect(getByText(/tag: priority/i)).toBeInTheDocument();
});
