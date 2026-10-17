import { useState } from 'react';
import Text from './components/atoms/Text';
import Button from './components/atoms/Button';
import Image from './components/atoms/Image';
import Cart from './pages/Cart';
import {
  agregarProductoAlCarrito,
  cambiarCantidadDelCarrito,
} from './data/carrito';

const productoInicial = {
  id: 1,
  nombre: 'Everyday Chaos',
  precio: 9990,
  stock: 12,
};

function App() {
  const [mensaje, setMensaje] = useState('');
  const [carrito, setCarrito] = useState([]);

  function agregarAlCarrito(producto) {
    const nuevoCarrito = agregarProductoAlCarrito(carrito, producto);

    if (nuevoCarrito === carrito) {
      setMensaje('No hay más stock disponible.');
      return;
    }

    setCarrito(nuevoCarrito);
    setMensaje('Producto añadido al carrito.');
  }

  function cambiarCantidad(id, cambio) {
    const nuevoCarrito = cambiarCantidadDelCarrito(
      carrito,
      id,
      cambio
    );

    if (nuevoCarrito === carrito) {
      setMensaje('No hay más stock disponible.');
      return;
    }

    setCarrito(nuevoCarrito);
    setMensaje('');
  }

  function quitarDelCarrito(id) {
    const nuevoCarrito = carrito.filter(
      (producto) => producto.id !== id
    );

    setCarrito(nuevoCarrito);
    setMensaje('Producto eliminado del carrito.');
  }

  function vaciarCarrito() {
    if (window.confirm('¿Quieres vaciar el carrito?')) {
      setCarrito([]);
      setMensaje('Carrito vaciado.');
    }
  }

  return (
    <div className="container py-4">
      <Text variant="h1">Pawchi Blind Boxes</Text>
      <Text>Pequeñas cajas, grandes sorpresas.</Text>

      <Image
        src="/img/lineup-everyday-chaos.png"
        alt="Colección Everyday Chaos de Pawchi"
        className="img-fluid imagen-inicio my-3"
      />

      <Text variant="h2">{productoInicial.nombre}</Text>
      <Text>
        Precio: ${productoInicial.precio.toLocaleString('es-CL')}
      </Text>
      <Text>Stock: {productoInicial.stock} unidades</Text>

      <Button onClick={() => agregarAlCarrito(productoInicial)}>
        Añadir al carrito
      </Button>

      {mensaje !== '' && (
        <p role="status" className="alert alert-info mt-3">
          {mensaje}
        </p>
      )}

      <section className="mt-5">
        <Cart
          carrito={carrito}
          cambiarCantidad={cambiarCantidad}
          quitarDelCarrito={quitarDelCarrito}
          vaciarCarrito={vaciarCarrito}
        />

        {carrito.length > 0 && (
          <Text className="mt-3">
            La finalización de compra se incorporará en el siguiente
            bloque de desarrollo.
          </Text>
        )}
      </section>
    </div>
  );
}

export default App;