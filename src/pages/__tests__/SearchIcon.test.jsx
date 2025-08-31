import { render, screen, fireEvent } from "@testing-library/react";
import SearchIcon from "../../icons/SearchIcon";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

// Mock store with darkMode false
const store = configureStore({
  reducer: { preferences: () => ({ darkMode: false }) },
});

describe("SearchIcon", () => {
  it("renders search button", () => {
    render(
      <Provider store={store}>
        <SearchIcon />
      </Provider>
    );

    expect(screen.getByRole("button", { name: /toggle search/i })).toBeInTheDocument();
  });

  it("shows input when clicked", () => {
    render(
      <Provider store={store}>
        <SearchIcon />
      </Provider>
    );

    const button = screen.getByRole("button", { name: /toggle search/i });
    fireEvent.click(button);

    const input = screen.getByPlaceholderText("Search...");
    expect(input).toBeVisible();
  });
});
