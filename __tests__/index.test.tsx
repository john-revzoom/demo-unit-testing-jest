import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "@/pages/index";

beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // Deprecated
      removeListener: jest.fn(), // Deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});

describe("Home", () => {
  test("should display correct default value in input", () => {
    render(<Home />);

    fireEvent.input(screen.getByTestId("optionalText"), {
      target: {
        value: "test",
      },
    });
  });

  test("should display error message when required input is empty", async () => {
    render(<Home />);

    fireEvent.click(screen.getByTestId("submitFormBtn"));

    await screen.findByText("Required text must not be empty.");
  });

  test("requiredNumber input should have a length of 10 only", async () => {
    render(<Home />);

    userEvent.type(screen.getByTestId("requiredNumber"), "1234567890");

    await waitFor(() => {
      let numberField = screen.getByTestId(
        "requiredNumber"
      ) as HTMLInputElement;
      expect(numberField.value.length).toBe(10);
    });
  });

  it("should show an error when input is not numbers only", async () => {
    render(<Home />);

    userEvent.type(screen.getByTestId("requiredNumber"), "abcdef");

    fireEvent.click(screen.getByTestId("submitFormBtn"));

    await screen.findByText("Input should only contain numbers");
  });

  it("should show an error when no special character is provided", async () => {
    render(<Home />);

    userEvent.type(screen.getByTestId("requiredSpecialCharacter"), "abcdef");

    fireEvent.click(screen.getByTestId("submitFormBtn"));

    await screen.findByText(
      "Input should have at least one special character."
    );
  });

  it("able to change the date", () => {
    render(<Home />);
    let date1Field = screen.getByTestId("dateInput") as HTMLInputElement;

    date1Field.setSelectionRange(0, date1Field.value.length);

    userEvent.type(date1Field, "1990-01-01");
  });

  it("should be able to display correct toggle state value", async () => {
    render(<Home />);
    let checkbox = screen.getByTestId("rememberMe") as HTMLElement;

    fireEvent.click(checkbox);

    await waitFor(() => {
      expect(checkbox).toBeChecked();
    });

    fireEvent.click(checkbox);

    await waitFor(() => {
      expect(checkbox).not.toBeChecked();
    });
  });
});
