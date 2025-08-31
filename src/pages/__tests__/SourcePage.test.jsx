import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../redux/store";
import SourcePage from "../pages/SourcePage";

test("renders default preference (Washington Post)", () => {
  render(
    <Provider store={store}>
      <SourcePage />
    </Provider>
  );
  expect(screen.getByText(/Washington Post/i)).toBeInTheDocument();
});

test("renders available sources list", () => {
  render(
    <Provider store={store}>
      <SourcePage />
    </Provider>
  );
  expect(screen.getByText(/BBC/i)).toBeInTheDocument();
  expect(screen.getByText(/CNN/i)).toBeInTheDocument();
});
