import { render, screen, fireEvent } from '@testing-library/react';
import Checkout from '../../pages/Checkout';

describe('Página Checkout', () => {
  const carrito = [
    {
      id: 1,
      nombre: 'Everyday Chaos',
      precio: 9990,
      cantidad: 2,
      stock: 12,
    },
  ];

  function completarCliente() {
    fireEvent.change(screen.getByLabelText('Nombre'), {
      target: { value: 'Ana Prueba' },
    });

    fireEvent.change(screen.getByLabelText('Correo'), {
      target: { value: 'ana@gmail.com' },
    });
  }

  it('informa cuando el carrito está vacío', () => {
    render(
      <Checkout carrito={[]} realizarCompra={() => {}} />
    );

    expect(
      screen.getByText(
        'Agrega productos al carrito antes de continuar.'
      )
    ).toBeTruthy();

    expect(
      screen.queryByRole('button', {
        name: 'Confirmar compra simulada',
      })
    ).toBeNull();
  });

  it('impide enviar el formulario sin nombre', () => {
    const realizarCompra = jasmine.createSpy('realizarCompra');

    render(
      <Checkout
        carrito={carrito}
        realizarCompra={realizarCompra}
      />
    );

    fireEvent.click(
      screen.getByRole('button', {
        name: 'Confirmar compra simulada',
      })
    );

    expect(screen.getByRole('alert').textContent).toBe(
      'Completa tu nombre.'
    );

    expect(realizarCompra).not.toHaveBeenCalled();
  });

  it('envía los datos de una compra con retiro', () => {
    const realizarCompra = jasmine.createSpy('realizarCompra');

    render(
      <Checkout
        carrito={carrito}
        realizarCompra={realizarCompra}
      />
    );

    completarCliente();

    fireEvent.click(
      screen.getByRole('button', {
        name: 'Confirmar compra simulada',
      })
    );

    expect(realizarCompra).toHaveBeenCalledWith(
      jasmine.objectContaining({
        nombre: 'Ana Prueba',
        correo: 'ana@gmail.com',
        entrega: 'retiro',
        resultado: 'aprobado',
      })
    );
  });

  it('suma el envío y exige dirección para domicilio', () => {
    const realizarCompra = jasmine.createSpy('realizarCompra');

    render(
      <Checkout
        carrito={carrito}
        realizarCompra={realizarCompra}
      />
    );

    completarCliente();

    fireEvent.change(screen.getByLabelText('Forma de entrega'), {
      target: { value: 'domicilio' },
    });

    expect(
      screen.getByText(
        'Total: $' + (22970).toLocaleString('es-CL')
      )
    ).toBeTruthy();

    fireEvent.click(
      screen.getByRole('button', {
        name: 'Confirmar compra simulada',
      })
    );

    expect(screen.getByRole('alert').textContent).toBe(
      'Completa la dirección, región y comuna.'
    );

    expect(realizarCompra).not.toHaveBeenCalled();
  });
});