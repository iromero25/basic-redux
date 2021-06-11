import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import AllNotes from "./AllNotes";
import store from "../redux/store/store";

// provides a set of custom jest matchers that you can use to extend jest
// i.e. `.toBeVisible`
import "@testing-library/jest-dom";

const Wrapper: React.FC = ({ children }) => (
  <Provider store={store}>{children}</Provider>
);

test("AllNotes component is rendered with initial values", () => {
  const { getByText } = render(
    <Wrapper>
      <AllNotes />
    </Wrapper>
  );
  const noteTitle = getByText("You are awesome");
  expect(noteTitle).toBeInTheDocument();
});
