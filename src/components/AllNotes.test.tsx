import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import AllNotes from "./AllNotes";
import store from "../redux/store/store";
import { addNote, TagValues } from "../redux/actions/actions";
import "@testing-library/jest-dom";

const Wrapper: React.FC = ({ children }) => (
  <Provider store={store}>{children}</Provider>
);

test("AllNotes component is rendered with initial values", () => {
  const { getByText, queryByText } = render(
    <Wrapper>
      <AllNotes />
    </Wrapper>
  );

  const title = "Added title";
  const testContent = "Added content";
  const noteTitle = getByText("You are awesome");
  expect(noteTitle).toBeInTheDocument();
  expect(queryByText(title)).not.toBeInTheDocument;

  // dispath the action adding a new Note into the DOM
  store.dispatch(addNote(title, testContent, TagValues.normal));
  expect(getByText(title)).toBeInTheDocument();
});
