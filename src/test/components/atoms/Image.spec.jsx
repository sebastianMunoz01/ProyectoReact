import { render, screen } from '@testing-library/react';
import Image from '../../../components/atoms/Image';

describe('Componente Image', () => {
  it('recibe la descripción de la imagen', () => {
    render(
      <Image alt="Caja Pawchi" />
    );

    const imagen = screen.getByRole('img', {
      name: 'Caja Pawchi'
    });

    expect(imagen.getAttribute('alt')).toBe('Caja Pawchi');
  });

  it('utiliza la dirección recibida por props', () => {
    const direccionPrueba = 'data:,';

    render(
      <Image
        src={direccionPrueba}
        alt="Producto de prueba"
      />
    );

    const imagen = screen.getByAltText('Producto de prueba');

    expect(imagen.getAttribute('src')).toBe(direccionPrueba);
  });

  it('aplica las clases recibidas', () => {
    render(
      <Image
        alt="Colección Pawchi"
        className="img-fluid"
      />
    );

    const imagen = screen.getByAltText('Colección Pawchi');

    expect(imagen.classList.contains('img-fluid')).toBe(true);
  });
});