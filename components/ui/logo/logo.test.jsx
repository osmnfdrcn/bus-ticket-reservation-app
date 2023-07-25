import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Logo from ".";

describe("Logo component", () => {
  test("Logo must be in document", () => {
    render(<Logo />);
    const logoText = screen.getByAltText("Logo");
    expect(logoText).toBeInTheDocument();
  });

  test("Must be redirected to '/' when clicked", async () => {
    render(<Logo />);
    const logoText = screen.getByAltText("Logo");
    await userEvent.click(logoText);
    expect(window.location.pathname).toBe("/");
  });
});
