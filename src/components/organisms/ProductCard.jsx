import { useNavigate } from "react-router-dom";
import Image from "../atoms/Image";
import Button from "../atoms/Button";
import CardBody from "../molecules/CardBody";
function ProductCard({ producto, agregarAlCarrito }) {
  const navigate = useNavigate();
  return (
    <article className="card h-100">
      <Image
        src={producto.imagen}
        alt={"Caja " + producto.nombre}
        className="product-image"
      />
      <div className="card-body d-flex flex-column gap-2">
        <CardBody producto={producto} />
        <Button
          variant="outline-secondary"
          onClick={() => navigate("/productos/" + producto.id)}
        >
          Ver detalles
        </Button>
        <Button
          disabled={producto.stock === 0}
          onClick={() => agregarAlCarrito(producto)}
        >
          {producto.stock === 0 ? "Sin stock" : "Añadir al carrito"}
        </Button>
      </div>
    </article>
  );
}
export default ProductCard;