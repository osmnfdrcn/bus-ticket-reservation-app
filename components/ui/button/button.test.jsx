import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from ".";

describe("Button component", () => {
  test("Button must be in document", () => {
    render(<Button> Test </Button>);
    const text = screen.getByText("Test");
    expect(text).toBeInTheDocument();
  });

  test("Button variant", () => {
    render(<Button variant={"primary"}> Test </Button>);
    const btn = screen.getByText("Test");
    // expect(btn).toHaveStyleRule("color", "rgb(255, 255, 255)");
  });

  // test("Button size", () => {
  //   render(<Button size={"small"}> Test </Button>);
  //   const btn = screen.getByText("Test");
  //   expect(btn).toHaveStyleRule("test", "text-sm");
  // });
});
