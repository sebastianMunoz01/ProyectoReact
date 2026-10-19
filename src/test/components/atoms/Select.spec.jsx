import { render, screen, fireEvent } from "@testing-library/react";
import Select from "../../../components/atoms/Select";
describe("Select", () => {
  it("S1 muestra opciones", () => {
    render(
      <Select aria-label="Categoría">
        <option>Comida</option>
        <option>Fantasia</option>
      </Select>,
    );
    expect(screen.getAllByRole("option").length).toBe(2);
  });
  it("S2 notifica selección", () => {
    const fn = jasmine.createSpy();
    render(
      <Select aria-label="Categoría" onChange={fn}>
        <option value="a">A</option>
        <option value="b">B</option>
      </Select>,
    );
    fireEvent.change(screen.getByLabelText("Categoría"), {
      target: { value: "b" },
    });
    expect(fn).toHaveBeenCalledTimes(1);
    expect(screen.getByLabelText("Categoría").value).toBe("b");
  });
  it("S3 respeta disabled y clase", () => {
    render(<Select disabled aria-label="Comuna" className="extra" />);
    const el = screen.getByLabelText("Comuna");
    expect(el.disabled).toBeTrue();
    expect(el.classList.contains("form-select")).toBeTrue();
    expect(el.classList.contains("extra")).toBeTrue();
  });
});