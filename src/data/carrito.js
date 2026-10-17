export function agregarProductoAlCarrito(carrito, producto) {
  const encontrado = carrito.find(
    (item) => item.id === producto.id
  );

  const cantidadActual = encontrado ? encontrado.cantidad : 0;

  if (cantidadActual >= producto.stock) {
    return carrito;
  }

  if (encontrado) {
    return carrito.map((item) =>
      item.id === producto.id
        ? { ...item, cantidad: item.cantidad + 1 }
        : item
    );
  }

  return [...carrito, { ...producto, cantidad: 1 }];
}

export function cambiarCantidadDelCarrito(carrito, id, cambio) {
  const encontrado = carrito.find((item) => item.id === id);

  if (!encontrado) {
    return carrito;
  }

  const nuevaCantidad = encontrado.cantidad + cambio;

  if (nuevaCantidad > encontrado.stock) {
    return carrito;
  }

  if (nuevaCantidad <= 0) {
    return carrito.filter((item) => item.id !== id);
  }

  return carrito.map((item) =>
    item.id === id
      ? { ...item, cantidad: nuevaCantidad }
      : item
  );
}

export function calcularTotalCarrito(carrito) {
  let total = 0;

  for (let i = 0; i < carrito.length; i++) {
    total = total + carrito[i].precio * carrito[i].cantidad;
  }

  return total;
}