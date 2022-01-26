import {
  fireEvent,
  render,
  screen,
  waitFor,
  prettyDOM,
  act,
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
    let checkbox = screen.getByTestId("rememberMe") as HTMLInputElement;

    fireEvent.click(checkbox);

    await waitFor(() => {
      expect(checkbox).toBeChecked();
    });

    fireEvent.click(checkbox);

    await waitFor(() => {
      expect(checkbox).not.toBeChecked();
    });
  });

  it("select dropdown should be able to change and display selected value", () => {
    render(<Home />);

    let dropdown = screen.getByRole("combobox") as HTMLInputElement;

    act(() => {
      fireEvent.click(dropdown, {
        target: {
          value: "demo",
        },
      });
    });

    expect(dropdown).toHaveValue("demo");
  });

  it("radio buttons should be able change and select correct value", () => {
    render(<Home />);

    let radioA = screen.getByTestId("radioA") as HTMLInputElement;

    console.log(prettyDOM(radioA));

    act(() => {
      fireEvent.click(radioA, {
        target: {
          checked: true,
        },
      });
    });

    expect(radioA).toBeChecked();
  });

  it("switch should able to change and display toggled input value", async () => {
    render(<Home />);

    let switchInput = screen.getByTestId("switchInput") as HTMLInputElement;

    act(() => {
      fireEvent.click(switchInput, {
        target: {
          checked: true,
        },
      });
    });

    await waitFor(() => {
      expect(switchInput).toBeChecked();
    });

    act(() => {
      fireEvent.click(switchInput, {
        target: {
          checked: false,
        },
      });
    });

    await waitFor(() => {
      expect(switchInput).not.toBeChecked();
    });
  });
});
