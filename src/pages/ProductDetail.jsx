import { useParams } from "react-router-dom";
import ProductCard from "../components/organisms/ProductCard";
import Link from "../components/atoms/Link";
function ProductDetail({ productos, agregarAlCarrito }) {
  const { id } = useParams();
  const producto = productos.find((p) => p.id === Number(id));
  if (!producto) return <h1>Producto no encontrado</h1>;
  return (
    <>
      <h1>Detalle del producto</h1>
      <div className="detail">
        <ProductCard producto={producto} agregarAlCarrito={agregarAlCarrito} />
      </div>
      <Link to="/catalogo">Volver al catálogo</Link>
    </>
  );
}
export default ProductDetail;