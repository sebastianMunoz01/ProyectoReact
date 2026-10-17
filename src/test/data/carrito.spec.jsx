import {
  agregarProductoAlCarrito,
  cambiarCantidadDelCarrito,
  calcularTotalCarrito,
} from '../../data/carrito';

describe('Lógica del carrito', () => {
  const producto = {
    id: 1,
    nombre: 'Everyday Chaos',
    precio: 9990,
    stock: 3,
  };

  it('agrega un producto nuevo con cantidad uno', () => {
    const resultado = agregarProductoAlCarrito([], producto);

    expect(resultado.length).toBe(1);
    expect(resultado[0].id).toBe(1);
    expect(resultado[0].cantidad).toBe(1);
  });

  it('aumenta la cantidad sin duplicar el producto', () => {
    const carrito = [{ ...producto, cantidad: 1 }];

    const resultado = agregarProductoAlCarrito(carrito, producto);

    expect(resultado.length).toBe(1);
    expect(resultado[0].cantidad).toBe(2);
    expect(carrito[0].cantidad).toBe(1);
  });

  it('impide agregar productos cuando no hay stock disponible', () => {
    const sinStock = { ...producto, stock: 0 };

    expect(agregarProductoAlCarrito([], sinStock).length).toBe(0);

    const carrito = [{ ...producto, cantidad: 3 }];

    const resultado = agregarProductoAlCarrito(carrito, producto);

    expect(resultado[0].cantidad).toBe(3);
  });

  it('permite sumar y restar cantidades disponibles', () => {
    const carrito = [{ ...producto, cantidad: 2 }];

    const aumentado = cambiarCantidadDelCarrito(carrito, 1, 1);
    const reducido = cambiarCantidadDelCarrito(carrito, 1, -1);

    expect(aumentado[0].cantidad).toBe(3);
    expect(reducido[0].cantidad).toBe(1);
    expect(carrito[0].cantidad).toBe(2);
  });

  it('impide superar el stock al cambiar cantidades', () => {
    const carrito = [{ ...producto, cantidad: 3 }];

    const resultado = cambiarCantidadDelCarrito(carrito, 1, 1);

    expect(resultado[0].cantidad).toBe(3);
  });

  it('elimina la línea cuando su cantidad llega a cero', () => {
    const carrito = [{ ...producto, cantidad: 1 }];

    const resultado = cambiarCantidadDelCarrito(carrito, 1, -1);

    expect(resultado.length).toBe(0);
  });

  it('calcula el total y devuelve cero para un carrito vacío', () => {
    const carrito = [
      { ...producto, cantidad: 2 },
      {
        id: 2,
        nombre: 'Fantasy Pups',
        precio: 10990,
        stock: 5,
        cantidad: 1,
      },
    ];

    expect(calcularTotalCarrito(carrito)).toBe(30970);
    expect(calcularTotalCarrito([])).toBe(0);
  });
});