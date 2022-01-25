import {
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import Home from "@/pages/index";

describe("Home", () => {
  test("should display correct default value in input", () => {
    render(<Home />);

    fireEvent.input(screen.getByTestId("optionalText"), {
      target: {
        value: "testing",
      },
    });
  });

  test("should display error message when required input is empty", async () => {
    render(<Home />);

    fireEvent.click(screen.getByTestId("submitFormBtn"));

    await screen.findByText("This input is required.")
  });
});
