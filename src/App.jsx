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
import Login from './pages/Login';
import Register from './pages/Register';
import Contact from './pages/Contact';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import Button from './components/atoms/Button';
import ShopLayout from './components/templates/ShopLayout';
import Home from './pages/Home';
import About from './pages/About';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';

import {
  leerDatos,
  guardarDatos,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
} from './data/datos';
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
  const [usuarioId, setUsuarioId] = useState(() => {
    const idGuardado = sessionStorage.getItem('pawchiUsuarioId');

    return idGuardado === null ? null : Number(idGuardado);
  });

  const usuario = datos.usuarios.find((persona) => persona.id === usuarioId) || null;
  
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

  function iniciarSesion(persona){
    sessionStorage.setItem('pawchiUsuarioId', String(persona.id));
    setUsuarioId(persona.id);
    setMensaje('');
  }

  function salir() {
    sessionStorage.removeItem('pawchiUsuarioId');
    setUsuarioId(null);
    setMensaje('');
    navigate('/');
  }

  function guardarUsuario(persona) {
    return actualizarDatos({
      ...datos,
      usuarios: [...datos.usuarios, persona],
    });
  }

  function guardarMensaje(nuevoMensaje) {
    return actualizarDatos({
      ...datos,
      mensajes: [...datos.mensajes, nuevoMensaje],
    });
  }

  function editarUsuario(id, nombre, tipo) {
    if (!usuario || usuario.tipo !== 'Administrador') {
      return false;
  }

  if (!nombre.trim() || nombre.length > 50) {
    setMensaje('Revisa el nombre del usuario.');
    return false;
  }

  if (id === usuario.id && tipo !== 'Administrador') {
    setMensaje('No puedes quitar tu propio rol de administrador.');
    return false;
  }

  const nuevosUsuarios = datos.usuarios.map((persona) =>
    persona.id === id
      ? { ...persona, nombre: nombre.trim(), tipo: tipo }
      : persona
  );

  return actualizarDatos({
    ...datos,
    usuarios: nuevosUsuarios,
  });
}

    function guardarProducto(producto) {
  if (!usuario || usuario.tipo !== 'Administrador') {
    return false;
  }

  let nuevosProductos;

  if (producto.id) {
    nuevosProductos = actualizarProducto(datos.productos, producto);
  } else {
    nuevosProductos = crearProducto(datos.productos, producto);
  }

  const nuevoCarrito = [];

  for (let i = 0; i < datos.carrito.length; i++) {
    const item = datos.carrito[i];

    const actual = nuevosProductos.find(
      (producto) => producto.id === item.id
    );

    if (actual && actual.stock > 0) {
      nuevoCarrito.push({
        ...actual,
        cantidad: Math.min(item.cantidad, actual.stock),
      });
    }
  }

  return actualizarDatos({
    ...datos,
    productos: nuevosProductos,
    carrito: nuevoCarrito,
  });
}

  function borrarProducto(id) {
    if (!usuario || usuario.tipo !== 'Administrador') {
      return;
    }

    const guardado = actualizarDatos({
      ...datos,
      productos: eliminarProducto(datos.productos, id),
      carrito: datos.carrito.filter((item) => item.id !== id),
    });

    if (guardado) {
      setMensaje('Producto eliminado.');
    }
  }
  
  function guardarCategoria(nombre, anterior) {
  if (!usuario || usuario.tipo !== 'Administrador') {
    return false;
  }

  nombre = nombre.trim();

  if (!nombre || nombre.length > 80) {
    setMensaje('Revisa el nombre de la categoría.');
    return false;
  }

  const repetida = datos.categorias.some(
    (categoria) =>
      categoria.toLowerCase() === nombre.toLowerCase() &&
      categoria !== anterior
  );

  if (repetida) {
    setMensaje('La categoría ya existe.');
    return false;
  }

  let nuevasCategorias;

  if (anterior === '') {
    nuevasCategorias = [...datos.categorias, nombre];
  } else {
    nuevasCategorias = datos.categorias.map((categoria) =>
      categoria === anterior ? nombre : categoria
    );
  }

  const nuevosProductos = datos.productos.map((producto) =>
    producto.categoria === anterior
      ? { ...producto, categoria: nombre }
      : producto
  );

  const nuevoCarrito = datos.carrito.map((producto) =>
    producto.categoria === anterior
      ? { ...producto, categoria: nombre }
      : producto
  );

  const guardado = actualizarDatos({
    ...datos,
    categorias: nuevasCategorias,
    productos: nuevosProductos,
    carrito: nuevoCarrito,
  });

  if (guardado) {
    setMensaje('Categoría guardada.');
  }

  return guardado;
}

  function borrarCategoria(nombre) {
    if (!usuario || usuario.tipo !== 'Administrador') {
      return;
    }

    const tieneProductos = datos.productos.some(
      (producto) => producto.categoria === nombre
    );

    if (tieneProductos) {
      setMensaje('No puedes eliminar una categoría con productos.');
      return;
    }

    const guardado = actualizarDatos({
      ...datos,
      categorias: datos.categorias.filter(
        (categoria) => categoria !== nombre
      ),
    });

    if (guardado) {
      setMensaje('Categoría eliminada.');
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
    <ShopLayout
      usuario={usuario}
      cantidad={cantidad}
      salir={salir}
      mensaje={mensaje}
    >
      <Routes>
        <Route
          path="/"
          element={
            <Home
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
          path="/login"
          element={<Login usuarios={datos.usuarios} iniciarSesion={iniciarSesion}/>}
        />

        <Route
          path="/registro"
          element={<Register usuarios={datos.usuarios} guardarUsuario={guardarUsuario}/>}
        />

        <Route
          path="/contacto"
          element={<Contact guardarMensaje={guardarMensaje} />}
        />

        <Route
          path="/perfil"
          element={
          <Profile usuario={usuario} pedidos={datos.pedidos}/>}
        />

        <Route
          path="/admin"
          element={
          <Admin
            datos={datos}
            usuario={usuario}
            guardarProducto={guardarProducto}
            borrarProducto={borrarProducto}
            guardarCategoria={guardarCategoria}
            borrarCategoria={borrarCategoria}
            guardarUsuario={guardarUsuario}
            editarUsuario={editarUsuario}
          />}
        />

        <Route 
          path="/nosotros" 
          element={<About />} 
        />

        <Route 
          path="/blog" 
          element={<Blog />} 
        />

        <Route 
          path="/blog/:id" 
          element={<BlogDetail />} 
        />

        <Route
          path="*"
          element={<h2>Página no encontrada</h2>}
        />
      </Routes>
    </ShopLayout>
  );
}

export default App;