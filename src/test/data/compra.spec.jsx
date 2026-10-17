import { procesarCompra } from '../../data/compra';

describe('Procesamiento de compra', () => {
  const productos = [
    {
      id: 1,
      nombre: 'Everyday Chaos',
      precio: 9990,
      stock: 3,
    },
  ];

  const carrito = [
    {
      ...productos[0],
      cantidad: 2,
    },
  ];

  const envio = {
    nombre: 'Ana Prueba',
    correo: 'ana@gmail.com',
    direccion: 'Dirección de prueba 123',
    entrega: 'domicilio',
    resultado: 'aprobado',
  };

  it('aprueba la compra, descuenta stock y vacía el carrito', () => {
    const resultado = procesarCompra(productos, carrito, envio);

    expect(resultado.error).toBe('');
    expect(resultado.pedido.resultado).toBe('aprobado');
    expect(resultado.pedido.subtotal).toBe(19980);
    expect(resultado.pedido.costoEnvio).toBe(2990);
    expect(resultado.pedido.total).toBe(22970);

    expect(resultado.productos[0].stock).toBe(1);
    expect(resultado.carrito.length).toBe(0);

    expect(productos[0].stock).toBe(3);
    expect(carrito[0].cantidad).toBe(2);
  });

  it('conserva stock y carrito cuando la compra es rechazada', () => {
    const envioRechazado = {
      ...envio,
      entrega: 'retiro',
      resultado: 'rechazado',
    };

    const resultado = procesarCompra(
      productos,
      carrito,
      envioRechazado
    );

    expect(resultado.error).toBe('');
    expect(resultado.pedido.resultado).toBe('rechazado');
    expect(resultado.pedido.costoEnvio).toBe(0);
    expect(resultado.pedido.total).toBe(19980);

    expect(resultado.productos[0].stock).toBe(3);
    expect(resultado.carrito[0].cantidad).toBe(2);
  });

  it('impide comprar con el carrito vacío', () => {
    const resultado = procesarCompra(productos, [], envio);

    expect(resultado.pedido).toBeNull();
    expect(resultado.error).toBe('El carrito está vacío.');
  });

  it('impide comprar cuando el stock actual es insuficiente', () => {
    const productosActualizados = [
      {
        ...productos[0],
        stock: 1,
      },
    ];

    const resultado = procesarCompra(
      productosActualizados,
      carrito,
      envio
    );

    expect(resultado.pedido).toBeNull();
    expect(resultado.error).toBe(
      'Revisa los productos y el stock del carrito.'
    );
  });

  it('utiliza el precio actual del producto', () => {
    const productosActualizados = [
      {
        ...productos[0],
        precio: 8000,
      },
    ];

    const resultado = procesarCompra(
      productosActualizados,
      carrito,
      { ...envio, entrega: 'retiro' }
    );

    expect(resultado.pedido.subtotal).toBe(16000);
    expect(resultado.pedido.total).toBe(16000);
    expect(resultado.pedido.productos[0].precio).toBe(8000);
  });

  it('impide comprar cantidades negativas', () => {
    const carritoInvalido = [
      {
        ...productos[0],
        cantidad: -1,
      },
    ];

    const resultado = procesarCompra(
      productos,
      carritoInvalido,
      envio
    );

    expect(resultado.pedido).toBeNull();
    expect(resultado.error).toBe(
      'Revisa los productos y el stock del carrito.'
    );
  });

  it('exige seleccionar entrega y resultado de pago válidos', () => {
    const sinEntrega = procesarCompra(
      productos,
      carrito,
      { ...envio, entrega: '' }
    );

    expect(sinEntrega.pedido).toBeNull();
    expect(sinEntrega.error).toBe(
      'Selecciona una forma de entrega.'
    );

    const sinResultado = procesarCompra(
      productos,
      carrito,
      { ...envio, resultado: '' }
    );

    expect(sinResultado.pedido).toBeNull();
    expect(sinResultado.error).toBe(
      'Selecciona un resultado de pago simulado.'
    );
  });
});