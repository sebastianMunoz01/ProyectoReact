export function procesarCompra(productos, carrito, envio) {
  if (carrito.length === 0) {
    return {
      pedido: null,
      error: 'El carrito está vacío.',
    };
  }

  if (
    envio.resultado !== 'aprobado' &&
    envio.resultado !== 'rechazado'
  ) {
    return {
      pedido: null,
      error: 'Selecciona un resultado de pago simulado.',
    };
  }

  if (envio.entrega !== 'retiro' && envio.entrega !== 'domicilio') {
    return {
      pedido: null,
      error: 'Selecciona una forma de entrega.',
    };
  }

  const productosPedido = [];
  let subtotal = 0;

  for (let i = 0; i < carrito.length; i++) {
    const item = carrito[i];

    const productoActual = productos.find(
      (producto) => producto.id === item.id
    );

    if (
      !productoActual ||
      !Number.isInteger(item.cantidad) ||
      item.cantidad <= 0 ||
      item.cantidad > productoActual.stock
    ) {
      return {
        pedido: null,
        error: 'Revisa los productos y el stock del carrito.',
      };
    }

    productosPedido.push({
      ...productoActual,
      cantidad: item.cantidad,
    });

    subtotal = subtotal + productoActual.precio * item.cantidad;
  }

  const costoEnvio = envio.entrega === 'domicilio' ? 2990 : 0;

  const pedido = {
    id: Date.now(),
    envio: { ...envio },
    resultado: envio.resultado,
    productos: productosPedido,
    subtotal: subtotal,
    costoEnvio: costoEnvio,
    total: subtotal + costoEnvio,
  };

  let nuevosProductos = productos;
  let nuevoCarrito = carrito;

  if (envio.resultado === 'aprobado') {
    nuevosProductos = productos.map((producto) => {
      const comprado = productosPedido.find(
        (item) => item.id === producto.id
      );

      if (comprado) {
        return {
          ...producto,
          stock: producto.stock - comprado.cantidad,
        };
      }

      return producto;
    });

    nuevoCarrito = [];
  }

  return {
    pedido: pedido,
    productos: nuevosProductos,
    carrito: nuevoCarrito,
    error: '',
  };
}