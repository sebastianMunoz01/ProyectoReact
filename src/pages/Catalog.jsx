import { useState } from "react";
import { useParams } from "react-router-dom";
import Campo from "../components/molecules/Campo";
import ProductGrid from "../components/organisms/ProductGrid";
function Catalog({ productos, agregarAlCarrito, ofertas = false }) {
  const [busqueda, setBusqueda] = useState("");
  const { categoria } = useParams();
  const productosFiltrados = productos.filter((producto) => {
    const coincideNombre = producto.nombre
      .toLowerCase()
      .includes(busqueda.toLowerCase());
    const coincideCategoria = !categoria || producto.categoria === categoria;
    const coincideOferta = !ofertas || producto.oferta;
    return coincideNombre && coincideCategoria && coincideOferta;
  });
  return (
    <>
      <h1>{ofertas ? "Ofertas" : categoria || "Catálogo"}</h1>
      <Campo
        id="buscar"
        label="Buscar productos"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />
      <ProductGrid
        productos={productosFiltrados}
        agregarAlCarrito={agregarAlCarrito}
      />
    </>
  );
}
export default Catalog;