import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SearchIcon from "../SearchIcon";
import { Provider } from "react-redux";
import store from "../redux/store";

test("renders search input hidden initially", () => {
  render(
    <Provider store={store}>
      <SearchIcon onSearch={() => {}} />
    </Provider>
  );
  const input = screen.getByPlaceholderText(/Search news/i);
  expect(input).toHaveClass("opacity-0"); 
});

test("toggles input visible when search icon clicked", () => {
  render(
    <Provider store={store}>
      <SearchIcon onSearch={() => {}} />
    </Provider>
  );
  fireEvent.click(screen.getByRole("button", { name: /Toggle Search/i }));
  const input = screen.getByPlaceholderText(/Search news/i);
  expect(input).not.toHaveClass("opacity-0");
});

test("calls onSearch after debounce", async () => {
  const mockSearch = jest.fn();
  render(
    <Provider store={store}>
      <SearchIcon onSearch={mockSearch} />
    </Provider>
  );
  fireEvent.click(screen.getByRole("button", { name: /Toggle Search/i }));
  fireEvent.change(screen.getByPlaceholderText(/Search news/i), { target: { value: "bbc" } });

  await waitFor(() => {
    expect(mockSearch).toHaveBeenCalledWith("bbc");
  }, { timeout: 600 });
});
