import Text from '../components/atoms/Text';
import Button from '../components/atoms/Button';

function PurchaseResult({
  pedido,
  volverAlCatalogo,
  reintentarCompra,
}) {
  if (!pedido) {
    return (
      <>
        <Text variant="h1">Resultado de compra</Text>
        <Text>No se encontró el pedido.</Text>
      </>
    );
  }

  const aprobada = pedido.resultado === 'aprobado';

  return (
    <section>
      <Text variant="h1">
        {aprobada ? 'Compra aprobada' : 'Compra rechazada'}
      </Text>

      <div
        role="status"
        className={
          aprobada ? 'alert alert-success' : 'alert alert-danger'
        }
      >
        {aprobada
          ? 'Tu compra simulada se completó correctamente.'
          : 'La compra simulada fue rechazada. Puedes intentarlo otra vez.'}
      </div>

      <Text>Pedido: {pedido.id}</Text>
      <Text>Cliente: {pedido.envio.nombre}</Text>
      <Text>Correo: {pedido.envio.correo}</Text>

      <Text variant="h2">Productos</Text>

      <ul className="list-group mb-3">
        {pedido.productos.map((producto) => (
          <li className="list-group-item" key={producto.id}>
            {producto.nombre} — Cantidad: {producto.cantidad}
          </li>
        ))}
      </ul>

      <Text className="fw-bold">
        Total: ${pedido.total.toLocaleString('es-CL')}
      </Text>

      <div className="d-flex flex-wrap gap-2">
        <Button onClick={volverAlCatalogo}>
          Volver al catálogo
        </Button>

        {!aprobada && (
          <Button
            variant="outline-primary"
            onClick={reintentarCompra}
          >
            Reintentar compra
          </Button>
        )}
      </div>
    </section>
  );
}

export default PurchaseResult;