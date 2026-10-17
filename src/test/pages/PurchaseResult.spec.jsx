import { render, screen, fireEvent } from '@testing-library/react';
import PurchaseResult from '../../pages/PurchaseResult';

describe('Página PurchaseResult', () => {
  const pedidoPrueba = {
    id: 1001,
    resultado: 'aprobado',
    envio: {
      nombre: 'Ana Prueba',
      correo: 'ana@gmail.com',
    },
    productos: [
      {
        id: 1,
        nombre: 'Everyday Chaos',
        cantidad: 2,
      },
    ],
    total: 19980,
  };

  it('muestra el pedido aprobado y permite volver al catálogo', () => {
    const volverAlCatalogo = jasmine.createSpy('volverAlCatalogo');

    render(
      <PurchaseResult
        pedido={pedidoPrueba}
        volverAlCatalogo={volverAlCatalogo}
      />
    );

    expect(
      screen.getByRole('heading', { name: 'Compra aprobada' })
    ).toBeTruthy();

    expect(screen.getByText('Pedido: 1001')).toBeTruthy();
    expect(screen.getByText('Cliente: Ana Prueba')).toBeTruthy();

    expect(
      screen.getByText(
        'Total: $' + pedidoPrueba.total.toLocaleString('es-CL')
      )
    ).toBeTruthy();

    expect(
      screen.queryByRole('button', { name: 'Reintentar compra' })
    ).toBeNull();

    fireEvent.click(
      screen.getByRole('button', { name: 'Volver al catálogo' })
    );

    expect(volverAlCatalogo).toHaveBeenCalledTimes(1);
  });

  it('muestra el rechazo y permite reintentar', () => {
    const reintentarCompra = jasmine.createSpy('reintentarCompra');

    const pedidoRechazado = {
      ...pedidoPrueba,
      resultado: 'rechazado',
    };

    render(
      <PurchaseResult
        pedido={pedidoRechazado}
        volverAlCatalogo={() => {}}
        reintentarCompra={reintentarCompra}
      />
    );

    expect(
      screen.getByRole('heading', { name: 'Compra rechazada' })
    ).toBeTruthy();

    fireEvent.click(
      screen.getByRole('button', { name: 'Reintentar compra' })
    );

    expect(reintentarCompra).toHaveBeenCalledTimes(1);
  });

  it('informa cuando no se encuentra un pedido', () => {
    render(<PurchaseResult pedido={null} />);

    expect(
      screen.getByText('No se encontró el pedido.')
    ).toBeTruthy();

    expect(
      screen.queryByRole('button', { name: 'Reintentar compra' })
    ).toBeNull();
  });
});