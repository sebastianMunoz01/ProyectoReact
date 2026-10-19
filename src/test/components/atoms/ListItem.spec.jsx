import { render, screen, fireEvent } from "@testing-library/react";
import ListItem from "../../../components/atoms/ListItem";
describe("ListItem", () => {
  it("LI1 conserva semántica de lista", () => {
    render(
      <ul>
        <ListItem>Uno</ListItem>
      </ul>,
    );
    expect(screen.getByRole("listitem").tagName).toBe("LI");
  });
  it("LI2 muestra contenido compuesto", () => {
    render(
      <ul>
        <ListItem>
          <strong>Foodies</strong>
        </ListItem>
      </ul>,
    );
    expect(screen.getByText("Foodies").tagName).toBe("STRONG");
  });
  it("LI3 propaga clases y atributos", () => {
    render(
      <ul>
        <ListItem className="list-group-item" aria-label="categoría">
          Comida
        </ListItem>
      </ul>,
    );
    expect(screen.getByLabelText("categoría").className).toBe(
      "list-group-item",
    );
  });
});