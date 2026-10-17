import { render, screen, fireEvent } from '@testing-library/react';
import Cart from '../../pages/Cart';

describe('Página Cart', () => {
  const carritoPrueba = [
    {
      id: 1,
      nombre: 'Everyday Chaos',
      precio: 9990,
      cantidad: 2,
    },
    {
      id: 2,
      nombre: 'Fantasy Pups',
      precio: 10990,
      cantidad: 1,
    },
  ];

  it('muestra un mensaje cuando el carrito está vacío', () => {
    render(<Cart carrito={[]} />);

    expect(
      screen.getByText('Tu carrito está vacío.')
    ).toBeTruthy();

    expect(
      screen.queryByRole('button', { name: 'Continuar compra' })
    ).toBeNull();
  });

  it('muestra los productos y calcula el total', () => {
    render(
      <Cart
        carrito={carritoPrueba}
        cambiarCantidad={() => {}}
        quitarDelCarrito={() => {}}
        vaciarCarrito={() => {}}
        continuarCompra={() => {}}
      />
    );

    expect(screen.getByText('Everyday Chaos')).toBeTruthy();
    expect(screen.getByText('Fantasy Pups')).toBeTruthy();

    const totalEsperado = 30970;

    expect(
      screen.getByText(
        'Total: $' + totalEsperado.toLocaleString('es-CL')
      )
    ).toBeTruthy();
  });

  it('avisa qué producto debe sumar o restar', () => {
    const cambiarCantidad = jasmine.createSpy('cambiarCantidad');

    render(
      <Cart
        carrito={carritoPrueba}
        cambiarCantidad={cambiarCantidad}
        quitarDelCarrito={() => {}}
        vaciarCarrito={() => {}}
        continuarCompra={() => {}}
      />
    );

    fireEvent.click(
      screen.getByRole('button', { name: 'Sumar Everyday Chaos' })
    );

    expect(cambiarCantidad).toHaveBeenCalledWith(1, 1);

    fireEvent.click(
      screen.getByRole('button', { name: 'Restar Everyday Chaos' })
    );

    expect(cambiarCantidad).toHaveBeenCalledWith(1, -1);
  });

  it('avisa qué producto debe eliminar', () => {
    const quitarDelCarrito = jasmine.createSpy('quitarDelCarrito');

    render(
      <Cart
        carrito={carritoPrueba}
        cambiarCantidad={() => {}}
        quitarDelCarrito={quitarDelCarrito}
        vaciarCarrito={() => {}}
        continuarCompra={() => {}}
      />
    );

    fireEvent.click(
      screen.getByRole('button', {
        name: 'Eliminar Fantasy Pups',
      })
    );

    expect(quitarDelCarrito).toHaveBeenCalledWith(2);
  });

  it('ejecuta las acciones de vaciar y continuar', () => {
    const vaciarCarrito = jasmine.createSpy('vaciarCarrito');
    const continuarCompra = jasmine.createSpy('continuarCompra');

    render(
      <Cart
        carrito={carritoPrueba}
        cambiarCantidad={() => {}}
        quitarDelCarrito={() => {}}
        vaciarCarrito={vaciarCarrito}
        continuarCompra={continuarCompra}
      />
    );

    fireEvent.click(
      screen.getByRole('button', { name: 'Vaciar carrito' })
    );

    expect(vaciarCarrito).toHaveBeenCalledTimes(1);

    fireEvent.click(
      screen.getByRole('button', { name: 'Continuar compra' })
    );

    expect(continuarCompra).toHaveBeenCalledTimes(1);
  });
});