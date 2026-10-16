import { render, screen } from '@testing-library/react';
import Text from '../../../components/atoms/Text';

describe('Componente Text', () => {
  it('muestra un párrafo por defecto', () => {
    render(<Text>Hola Pawchi</Text>);

    const texto = screen.getByText('Hola Pawchi');

    expect(texto.tagName).toBe('P');
  });

  it('muestra un título cuando recibe variant h1', () => {
    render(<Text variant="h1">Pawchi Blind Boxes</Text>);

    const titulo = screen.getByRole('heading', {
      level: 1
    });

    expect(titulo.textContent).toBe('Pawchi Blind Boxes');
  });

  it('aplica la clase recibida por props', () => {
    render(
      <Text className="texto-destacado">
        Grandes sorpresas
      </Text>
    );

    const texto = screen.getByText('Grandes sorpresas');

    expect(
      texto.classList.contains('texto-destacado')
    ).toBe(true);
  });
});