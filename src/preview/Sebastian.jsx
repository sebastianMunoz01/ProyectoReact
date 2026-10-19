import { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { datosIniciales, crearProducto, actualizarProducto, eliminarProducto } from '../data/datos';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Contact from '../pages/Contact';
import Profile from '../pages/Profile';

function Sebastian() {
  const [datos, setDatos] = useState(() => {
    const texto = localStorage.getItem('pawchiPreviewSebastian');
    return texto ? JSON.parse(texto) : datosIniciales();
  });
  const [usuario, setUsuario] = useState(() =>
    JSON.parse(sessionStorage.getItem('pawchiPreviewUsuario') || 'null'));
  const [mensaje, setMensaje] = useState('');

  function actualizarDatos(nuevosDatos) {
    try {
      localStorage.setItem('pawchiPreviewSebastian', JSON.stringify(nuevosDatos));
      setDatos(nuevosDatos);
      return true;
    } catch {
      setMensaje('No fue posible guardar los datos.');
      return false;
    }
  }

  function iniciarSesion(persona) {
    sessionStorage.setItem("pawchiPreviewUsuario", JSON.stringify(persona));
    setUsuario(persona);
    setMensaje("");
  }

  function salir() {
    sessionStorage.removeItem("pawchiPreviewUsuario");
    setUsuario(null);
    setMensaje("");
  }

  function guardarCategoria(nombre, anterior) {
    if (!usuario || usuario.tipo !== "Administrador") return false;
    nombre = nombre.trim();
    if (!nombre || nombre.length > 80) {
      setMensaje("Revisa el nombre de categoría.");
      return false;
    }
    if (
      datos.categorias.some(
        (categoria) =>
          categoria.toLowerCase() === nombre.toLowerCase() &&
          categoria !== anterior,
      )
    ) {
      setMensaje("Categoría repetida.");
      return false;
    }
    let nuevasCategorias;
    if (anterior === "") nuevasCategorias = [...datos.categorias, nombre];
    else
      nuevasCategorias = datos.categorias.map((categoria) =>
        categoria === anterior ? nombre : categoria,
      );
    const nuevosProductos = datos.productos.map((producto) =>
      producto.categoria === anterior
        ? { ...producto, categoria: nombre }
        : producto,
    );
    const guardado = actualizarDatos({
      ...datos,
      categorias: nuevasCategorias,
      productos: nuevosProductos,
    });
    if (guardado) setMensaje("Categoría guardada.");
    return guardado;
  }

  function borrarCategoria(nombre) {
    if (!usuario || usuario.tipo !== "Administrador") return;
    if (datos.productos.some((producto) => producto.categoria === nombre)) {
      setMensaje("La categoría tiene productos.");
      return;
    }
    actualizarDatos({
      ...datos,
      categorias: datos.categorias.filter((categoria) => categoria !== nombre),
    });
  }

  function editarUsuario(id, nombre, tipo) {
    if (!usuario || usuario.tipo !== "Administrador") return false;
    if (!nombre.trim() || nombre.length > 50) {
      setMensaje("Revisa el nombre del usuario.");
      return false;
    }
    if (id === usuario.id && tipo !== "Administrador") {
      setMensaje("No puedes quitar tu propio rol de administrador.");
      return false;
    }
    const nuevosUsuarios = datos.usuarios.map((persona) =>
      persona.id === id
        ? { ...persona, nombre: nombre.trim(), tipo: tipo }
        : persona,
    );
    return actualizarDatos({ ...datos, usuarios: nuevosUsuarios });
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

  function guardarProducto(producto) {
    if (!usuario || usuario.tipo !== "Administrador") return false;
    let nuevosProductos;
    if (producto.id)
      nuevosProductos = actualizarProducto(datos.productos, producto);
    else nuevosProductos = crearProducto(datos.productos, producto);
    const nuevoCarrito = datos.carrito
      .map((item) => {
        const actual = nuevosProductos.find((p) => p.id === item.id);
        return { ...actual, cantidad: Math.min(item.cantidad, actual.stock) };
      })
      .filter((item) => item.cantidad > 0);
    return actualizarDatos({
      ...datos,
      productos: nuevosProductos,
      carrito: nuevoCarrito,
    });
  }

  function borrarProducto(id) {
    if (!usuario || usuario.tipo !== "Administrador") return;
    actualizarDatos({
      ...datos,
      productos: eliminarProducto(datos.productos, id),
      carrito: datos.carrito.filter((item) => item.id !== id),
    });
  }

  return (
    <main className="container py-4">
      <p>Vista de trabajo de Sebastián</p>
      <nav className="d-flex gap-3 flex-wrap">
        <Link to="/">Inicio</Link><Link to="/registro">Registro</Link>
        <Link to="/login">Ingresar</Link><Link to="/contacto">Contacto</Link>
        <Link to="/perfil">Perfil</Link><Link to="/admin">Panel</Link>
        <button onClick={salir}>Salir</button>
      </nav>
      {mensaje && <p role="status">{mensaje}</p>}
      <Routes>
        <Route path="/" element={<h1>Sesión de {usuario?.nombre || 'visitante'}</h1>} />
        <Route path="/login" element={<Login usuarios={datos.usuarios}
          iniciarSesion={iniciarSesion} />} />
        <Route path="/registro" element={<Register usuarios={datos.usuarios}
          guardarUsuario={guardarUsuario} />} />
        <Route path="/contacto" element={<Contact guardarMensaje={guardarMensaje} />} />
        <Route path="/perfil" element={<Profile usuario={usuario}
          pedidos={datos.pedidos} />} />
        <Route path="/admin" element={<h1>Panel en el siguiente PR</h1>} />
        <Route path="*" element={<h1>Página no encontrada</h1>} />
      </Routes>
    </main>
  );
}
export default Sebastian;