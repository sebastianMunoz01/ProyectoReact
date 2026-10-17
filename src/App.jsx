import { useState } from 'react';
import Text from './components/atoms/Text';
import Button from './components/atoms/Button';
import Image from './components/atoms/Image';

function App() {
  const [mensaje, setMensaje] = useState('');

  function mostrarInformacion() {
    setMensaje(
      'Pawchi es una tienda de figuras coleccionables sorpresa.'
    );
  }

  return (
    <div className="container py-4">
      <Text variant="h1">Pawchi Blind Boxes</Text>

      <Text>Pequeñas cajas, grandes sorpresas.</Text>

      <div>
        <Image
          src="/img/lineup-everyday-chaos.png"
          alt="Colección Everyday Chaos de Pawchi"
          className="img-fluid imagen-inicio my-3"
        />
      </div>

      <Button variant="primary" onClick={mostrarInformacion}>
        Conocer Pawchi
      </Button>

      {mensaje !== '' && (
        <Text className="mt-3">{mensaje}</Text>
      )}
    </div>
  );
}

export default App;