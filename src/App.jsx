import { useState } from 'react';
import {
  Routes,
  Route,
  Link,
  useNavigate,
  useParams,
} from 'react-router-dom';

import Catalog from './pages/Catalog';
import Categories from './pages/Categories';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import PurchaseResult from './pages/PurchaseResult';

import { leerDatos, guardarDatos } from './data/datos';
import {
  agregarProductoAlCarrito,
  cambiarCantidadDelCarrito,
} from './data/carrito';
import { procesarCompra } from './data/compra';

function ResultadoCompra({ pedidos }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const pedido = pedidos.find(
    (pedido) => pedido.id === Number(id)
  );

  return (
    <PurchaseResult
      pedido={pedido}
      volverAlCatalogo={() => navigate('/catalogo')}
      reintentarCompra={() => navigate('/checkout')}
    />
  );
}

function App() {
  const [datos, setDatos] = useState(leerDatos);
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  function actualizarDatos(nuevosDatos) {
    try {
      guardarDatos(nuevosDatos);
      setDatos(nuevosDatos);
      return true;
    } catch {
      setMensaje('No se pudieron guardar los cambios.');
      return false;
    }
  }

  function agregarAlCarrito(producto) {
    const nuevoCarrito = agregarProductoAlCarrito(
      datos.carrito,
      producto
    );

    if (nuevoCarrito === datos.carrito) {
      setMensaje('No hay más stock disponible.');
      return;
    }

    const guardado = actualizarDatos({
      ...datos,
      carrito: nuevoCarrito,
    });

    if (guardado) {
      setMensaje('Producto añadido al carrito.');
    }
  }

  function cambiarCantidad(id, cambio) {
    const nuevoCarrito = cambiarCantidadDelCarrito(
      datos.carrito,
      id,
      cambio
    );

    if (nuevoCarrito === datos.carrito) {
      setMensaje('No hay más stock disponible.');
      return;
    }

    const guardado = actualizarDatos({
      ...datos,
      carrito: nuevoCarrito,
    });

    if (guardado) {
      setMensaje('');
    }
  }

  function quitarDelCarrito(id) {
    const nuevoCarrito = datos.carrito.filter(
      (producto) => producto.id !== id
    );

    const guardado = actualizarDatos({
      ...datos,
      carrito: nuevoCarrito,
    });

    if (guardado) {
      setMensaje('Producto eliminado del carrito.');
    }
  }

  function vaciarCarrito() {
    if (!window.confirm('¿Quieres vaciar el carrito?')) {
      return;
    }

    const guardado = actualizarDatos({
      ...datos,
      carrito: [],
    });

    if (guardado) {
      setMensaje('Carrito vaciado.');
    }
  }

  function realizarCompra(envio) {
    const resultado = procesarCompra(
      datos.productos,
      datos.carrito,
      envio
    );

    if (resultado.error !== '') {
      setMensaje(resultado.error);
      return;
    }

    const nuevosDatos = {
      ...datos,
      productos: resultado.productos,
      carrito: resultado.carrito,
      pedidos: [...datos.pedidos, resultado.pedido],
    };

    if (actualizarDatos(nuevosDatos)) {
      setMensaje('');
      navigate('/compra/' + resultado.pedido.id);
    }
  }

  let cantidad = 0;

  for (let i = 0; i < datos.carrito.length; i++) {
    cantidad = cantidad + datos.carrito[i].cantidad;
  }

  return (
    <div className="container py-4">
      <h1>Pawchi Blind Boxes</h1>

      <nav className="d-flex flex-wrap gap-3 mb-4">
        <Link to="/">Inicio</Link>
        <Link to="/catalogo">Catálogo</Link>
        <Link to="/categorias">Categorías</Link>
        <Link to="/ofertas">Ofertas</Link>
        <Link to="/carrito">Carrito ({cantidad})</Link>
      </nav>

      {mensaje !== '' && (
        <p role="status" className="alert alert-info">
          {mensaje}
        </p>
      )}

      <Routes>
        <Route
          path="/"
          element={
            <Catalog
              productos={datos.productos}
              agregarAlCarrito={agregarAlCarrito}
            />
          }
        />

        <Route
          path="/catalogo"
          element={
            <Catalog
              productos={datos.productos}
              agregarAlCarrito={agregarAlCarrito}
            />
          }
        />

        <Route
          path="/categorias"
          element={<Categories categorias={datos.categorias} />}
        />

        <Route
          path="/categorias/:categoria"
          element={
            <Catalog
              productos={datos.productos}
              agregarAlCarrito={agregarAlCarrito}
            />
          }
        />

        <Route
          path="/ofertas"
          element={
            <Catalog
              ofertas
              productos={datos.productos}
              agregarAlCarrito={agregarAlCarrito}
            />
          }
        />

        <Route
          path="/productos/:id"
          element={
            <ProductDetail
              productos={datos.productos}
              agregarAlCarrito={agregarAlCarrito}
            />
          }
        />

        <Route
          path="/carrito"
          element={
            <Cart
              carrito={datos.carrito}
              cambiarCantidad={cambiarCantidad}
              quitarDelCarrito={quitarDelCarrito}
              vaciarCarrito={vaciarCarrito}
              continuarCompra={() => {
                setMensaje('');
                navigate('/checkout');
              }}
            />
          }
        />

        <Route
          path="/checkout"
          element={
            <Checkout
              carrito={datos.carrito}
              realizarCompra={realizarCompra}
            />
          }
        />

        <Route
          path="/compra/:id"
          element={<ResultadoCompra pedidos={datos.pedidos} />}
        />

        <Route
          path="*"
          element={<h2>Página no encontrada</h2>}
        />
      </Routes>
    </div>
  );
}

export default App;