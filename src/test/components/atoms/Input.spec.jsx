import { render, screen, fireEvent } from "@testing-library/react";
import Input from "../../../components/atoms/Input";
describe("Input", () => {
  it("IN1 muestra valor recibido", () => {
    render(<Input aria-label="Nombre" defaultValue="Javier" />);
    expect(screen.getByLabelText("Nombre").value).toBe("Javier");
  });
  it("IN2 informa cambios", () => {
    const fn = jasmine.createSpy();
    render(<Input aria-label="Nombre" onChange={fn} />);
    fireEvent.change(screen.getByLabelText("Nombre"), {
      target: { value: "Bryan" },
    });
    expect(fn).toHaveBeenCalledTimes(1);
  });
  it("IN3 propaga restricciones y accesibilidad", () => {
    render(
      <Input
        aria-label="Stock"
        type="number"
        min="0"
        disabled
        aria-invalid="true"
      />,
    );
    const el = screen.getByLabelText("Stock");
    expect(el.disabled).toBeTrue();
    expect(el.min).toBe("0");
    expect(el.getAttribute("aria-invalid")).toBe("true");
  });
});