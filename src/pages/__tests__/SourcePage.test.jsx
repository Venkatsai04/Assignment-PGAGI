import { render, screen } from "@testing-library/react";
import SourcePage from "../../pages/SourcePage";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

// Mock store with darkMode false
const store = configureStore({
  reducer: { preferences: () => ({ darkMode: false }) },
});

describe("SourcePage", () => {
  it("renders Sources heading", () => {
    render(
      <Provider store={store}>
        <SourcePage />
      </Provider>
    );

    expect(screen.getByText(/Sources/i)).toBeInTheDocument();
  });

  it("renders default preference (Washington Post)", () => {
    render(
      <Provider store={store}>
        <SourcePage />
      </Provider>
    );

    expect(screen.getByText(/Washington Post/i)).toBeInTheDocument();
  });
});
