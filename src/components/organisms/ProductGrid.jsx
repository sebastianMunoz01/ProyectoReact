import ProductCard from "./ProductCard";
function ProductGrid({ productos, agregarAlCarrito }) {
  if (productos.length === 0)
    return <p>No hay productos para estos filtros.</p>;
  return (
    <div className="row g-4">
      {productos.map((producto) => (
        <div className="col-12 col-md-6 col-lg-4" key={producto.id}>
          <ProductCard
            producto={producto}
            agregarAlCarrito={agregarAlCarrito}
          />
        </div>
      ))}
    </div>
  );
}
export default ProductGrid;