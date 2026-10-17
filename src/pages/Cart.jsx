import Button from '../components/atoms/Button';
import Text from '../components/atoms/Text';

function Cart({
  carrito,
  cambiarCantidad,
  quitarDelCarrito,
  vaciarCarrito,
  continuarCompra,
}) {
  let total = 0;

  for (let i = 0; i < carrito.length; i++) {
    total = total + carrito[i].precio * carrito[i].cantidad;
  }

  if (carrito.length === 0) {
    return (
      <>
        <Text variant="h1">Mi carrito</Text>
        <Text>Tu carrito está vacío.</Text>
      </>
    );
  }

  return (
    <>
      <Text variant="h1">Mi carrito</Text>

      <div className="table-responsive">
        <table className="table align-middle">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Subtotal</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {carrito.map((producto) => (
              <tr key={producto.id}>
                <td>{producto.nombre}</td>

                <td>
                  ${producto.precio.toLocaleString('es-CL')}
                </td>

                <td>
                  <div className="d-flex align-items-center gap-2">
                    <Button
                      variant="outline-secondary"
                      aria-label={'Restar ' + producto.nombre}
                      onClick={() => cambiarCantidad(producto.id, -1)}
                    >
                      −
                    </Button>

                    <span>{producto.cantidad}</span>

                    <Button
                      variant="outline-secondary"
                      aria-label={'Sumar ' + producto.nombre}
                      onClick={() => cambiarCantidad(producto.id, 1)}
                    >
                      +
                    </Button>
                  </div>
                </td>

                <td>
                  $
                  {(producto.precio * producto.cantidad).toLocaleString(
                    'es-CL'
                  )}
                </td>

                <td>
                  <Button
                    variant="danger"
                    onClick={() => quitarDelCarrito(producto.id)}
                  >
                    Eliminar {producto.nombre}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Text className="fw-bold">
        Total: ${total.toLocaleString('es-CL')}
      </Text>

      <div className="d-flex flex-wrap gap-2">
        <Button variant="outline-danger" onClick={vaciarCarrito}>
          Vaciar carrito
        </Button>

        <Button onClick={continuarCompra}>
          Continuar compra
        </Button>
      </div>
    </>
  );
}

export default Cart;