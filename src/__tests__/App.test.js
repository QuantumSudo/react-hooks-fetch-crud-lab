// src/__tests__/App.test.js
import React from "react";
import { fireEvent, render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { server } from "../mocks/server";
import App from "../components/App";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("displays question prompts after fetching", async () => {
  render(<App />);

  fireEvent.click(screen.queryByText(/View Questions/));

  expect(await screen.findByText(/lorem testum 1/g)).toBeInTheDocument();
  expect(await screen.findByText(/lorem testum 2/g)).toBeInTheDocument();
});

test("creates a new question when the form is submitted", async () => {
  render(<App />);

  // Wait for the first render of list
  await screen.findByText(/lorem testum 1/g);

  // Click on 'New Question' to open the form
  fireEvent.click(screen.queryByText("New Question"));

  // Fill out the form fields
  fireEvent.change(screen.getByLabelText(/Prompt/), {
    target: { value: "Test Prompt" },
  });
  fireEvent.change(screen.getByLabelText(/Answer 1/), {
    target: { value: "Test Answer 1" },
  });
  fireEvent.change(screen.getByLabelText(/Answer 2/), {
    target: { value: "Test Answer 2" },
  });
  fireEvent.change(screen.getByLabelText(/Answer 3/), {
    target: { value: "Test Answer 3" },
  });
  fireEvent.change(screen.getByLabelText(/Answer 4/), {
    target: { value: "Test Answer 4" },
  });

  // Select the correct answer dropdown (this part should work now)
  fireEvent.change(screen.getByTestId('correct-answer-dropdown'), {
    target: { value: '1' }, // Select the second answer (Test Answer 2)
  });

  // Submit the form
  fireEvent.submit(screen.getByText(/Add Question/));

  // View questions to verify that the new question appears
  fireEvent.click(screen.queryByText(/View Questions/));

  // Verify that the newly created question is displayed
  expect(await screen.findByText(/Test Prompt/g)).toBeInTheDocument();
  expect(await screen.findByText(/lorem testum 1/g)).toBeInTheDocument();
});

test("deletes the question when the delete button is clicked", async () => {
  render(<App />);

  fireEvent.click(screen.queryByText(/View Questions/));

  await screen.findByText(/lorem testum 1/g);

  fireEvent.click(screen.queryAllByText("Delete Question")[0]);

  await waitForElementToBeRemoved(() => screen.queryByText(/lorem testum 1/g));

  expect(screen.queryByText(/lorem testum 1/g)).not.toBeInTheDocument();
});
