import Text from "../atoms/Text";
import Precio from "./Precio";
function CardBody({ producto }) {
  return (
    <>
      <Text variant="h2" className="h4">
        {producto.nombre}
      </Text>
      <Text>{producto.descripcion}</Text>
      <Text>
        {producto.categoria} · Stock: {producto.stock}
      </Text>
      {producto.oferta && <Text className="text-success">Oferta</Text>}
      <Precio valor={producto.precio} />
    </>
  );
}
export default CardBody;