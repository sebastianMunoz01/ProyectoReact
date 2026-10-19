import { render, screen, fireEvent } from "@testing-library/react";
import Link from "../../../components/atoms/Link";
import { MemoryRouter, Routes, Route } from "react-router-dom";
describe("Link", () => {
  it("L1 muestra texto accesible", () => {
    render(
      <MemoryRouter>
        <Link to="/catalogo">Catálogo</Link>
      </MemoryRouter>,
    );
    expect(screen.getByRole("link", { name: "Catálogo" })).toBeTruthy();
  });
  it("L2 genera destino", () => {
    render(
      <MemoryRouter>
        <Link to="/productos/1">Detalle</Link>
      </MemoryRouter>,
    );
    expect(screen.getByText("Detalle").getAttribute("href")).toBe(
      "/productos/1",
    );
  });
  it("L3 navega al hacer clic", () => {
    render(
      <MemoryRouter>
        <Link to="/catalogo">Ir</Link>
        <Routes>
          <Route path="/catalogo" element={<h1>Catálogo abierto</h1>} />
        </Routes>
      </MemoryRouter>,
    );
    fireEvent.click(screen.getByText("Ir"));
    expect(screen.getByRole("heading").textContent).toBe("Catálogo abierto");
  });
});