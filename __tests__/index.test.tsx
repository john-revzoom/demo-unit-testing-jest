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

  it("should show an error when dateinput is empty", async () => {
    render(<Home />);

    fireEvent.click(screen.getByTestId("submitFormBtn"));

    await screen.findByText("Date is required.");
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

  it("should show an error when checkbox is not checked", async () => {
    render(<Home />);

    fireEvent.click(screen.getByTestId("submitFormBtn"));

    await screen.findByText("This checkbox is required");
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

    act(() => {
      fireEvent.click(radioA, {
        target: {
          checked: true,
        },
      });
    });

    expect(radioA).toBeChecked();
  });

  it("should display an error when no radio button is selected", async () => {
    render(<Home />);
    fireEvent.click(screen.getByTestId("submitFormBtn"));

    await screen.findByText("Select one option");
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

  it("should have correct form values on submit", () => {
    const handleSubmit = jest.fn();
    render(<Home />);

    let formSubmit = screen.getByTestId("submitBtn");
    let requiredText = screen.getByTestId("requiredInput") as HTMLInputElement;
    let requiredNumber = screen.getByTestId(
      "requiredNumber"
    ) as HTMLInputElement;
    let specialCharacter = screen.getByTestId(
      "requiredSpecialCharacter"
    ) as HTMLInputElement;
    let dateInput = screen.getByTestId("dateInput") as HTMLInputElement;
    let selectInput = screen.getByTestId("selectInput") as HTMLInputElement;

    fireEvent.change(requiredText, {
      target: {
        value: "test1",
      },
    });

    fireEvent.change(requiredNumber, {
      target: {
        value: 123,
      },
    });

    fireEvent.change(specialCharacter, {
      target: {
        value: "abcd$",
      },
    });

    dateInput.setSelectionRange(0, dateInput.value.length);
    fireEvent.change(dateInput, "2022-01-27");

    fireEvent.change(selectInput, {
      target: {
        value: "demo",
      },
    });

    fireEvent.click(formSubmit);
    expect(handleSubmit).toHaveBeenCalledTimes(1);
    expect(handleSubmit).toHaveBeenCalledWith({
      requiredText: "test1",
      requiredNumber: 123,
      specialCharacter: "abcd$",
      dateInput: "2022-01-27",
      selectInput: "demo",
    });
  });
});
