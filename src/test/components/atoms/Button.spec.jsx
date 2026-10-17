import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../../../components/atoms/Button';

describe('Componente Button', () => {
  it('muestra el texto y aplica la variante recibida', () => {
    render(
      <Button variant="success">
        Ver productos
      </Button>
    );

    const boton = screen.getByRole('button', {
      name: 'Ver productos'
    });

    expect(boton.textContent).toBe('Ver productos');
    expect(boton.classList.contains('btn-success')).toBe(true);
  });

  it('ejecuta la función al hacer clic', () => {
    const manejarClick = jasmine.createSpy('manejarClick');

    render(
      <Button onClick={manejarClick}>
        Añadir
      </Button>
    );

    fireEvent.click(
      screen.getByRole('button', { name: 'Añadir' })
    );

    expect(manejarClick).toHaveBeenCalledTimes(1);
  });

  it('no ejecuta la función cuando está deshabilitado', () => {
    const manejarClick = jasmine.createSpy('manejarClick');

    render(
      <Button disabled onClick={manejarClick}>
        Sin stock
      </Button>
    );

    const boton = screen.getByRole('button', {
      name: 'Sin stock'
    });

    fireEvent.click(boton);

    expect(boton.disabled).toBe(true);
    expect(manejarClick).not.toHaveBeenCalled();
  });
});