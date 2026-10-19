import { useState } from "react";
import Campo from "../molecules/Campo";
import Button from "../atoms/Button";

function CategoriasAdmin({ categorias, guardarCategoria, borrarCategoria }) {
  const [nombre, setNombre] = useState("");
  const [anterior, setAnterior] = useState("");

  function enviar(evento) {
    evento.preventDefault();
    if (guardarCategoria(nombre, anterior)) {
      setNombre("");
      setAnterior("");
    }
  }

  return (
    <section className="mt-4">
      <h2>Categorías del panel</h2>
      <ul>
        {categorias.map((categoria) => (
          <li key={categoria}>
            {categoria}{" "}
            <Button
              variant="outline-secondary"
              onClick={() => {
                setNombre(categoria);
                setAnterior(categoria);
              }}
            >
              Editar categoría {categoria}
            </Button>{" "}
            <Button
              variant="outline-danger"
              onClick={() => {
                if (confirm("¿Eliminar esta categoría?"))
                  borrarCategoria(categoria);
              }}
            >
              Eliminar categoría {categoria}
            </Button>
          </li>
        ))}
      </ul>
      <form onSubmit={enviar}>
        <Campo
          id="nombreCategoria"
          label="Nombre de categoría"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <Button type="submit">
          {anterior === "" ? "Crear categoría" : "Guardar categoría"}
        </Button>{" "}
        <Button
          variant="secondary"
          onClick={() => {
            setNombre("");
            setAnterior("");
          }}
        >
          Cancelar categoría
        </Button>
      </form>
    </section>
  );
}
export default CategoriasAdmin;