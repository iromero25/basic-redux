import React, { useState } from "react";
import { fireEvent, render } from "@testing-library/react";
// provides a set of custom jest matchers that you can use to extend jest
// i.e. `.toBeVisible`
import "@testing-library/jest-dom";

// this is just a test component that is not displayed in this  app  but
// used to learn about the capabilities of the testing library for React
const TestComponent: React.FC = () => {
  const [age, setAge] = useState<number>(39);

  const birthday = () => setAge(age + 1);

  return (
    <>
      <span>{age}</span>
      <button onClick={birthday}>celebrate</button>
    </>
  );
};

test("Test component renders and DOM is updated after button is clicked", () => {
  const { getByText } = render(<TestComponent />);
  const age = getByText("39");
  expect(age).toBeInTheDocument();

  const celebrateBtn = getByText("celebrate");
  fireEvent.click(celebrateBtn);

  const birthdayAge = getByText("40");
  expect(birthdayAge).toBeInTheDocument();
});
