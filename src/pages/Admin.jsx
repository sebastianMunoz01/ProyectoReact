import CategoriasAdmin from "../components/organisms/CategoriasAdmin";
import UsuariosAdmin from "../components/organisms/UsuariosAdmin";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import Button from "../components/atoms/Button";
import Precio from "../components/molecules/Precio";
import ProductForm from "../components/organisms/ProductForm";

function Admin({
  datos,
  usuario,
  guardarProducto,
  borrarProducto,
  guardarCategoria,
  borrarCategoria,
  guardarUsuario,
  editarUsuario,
}) {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [productoEditado, setProductoEditado] = useState(null);

  if (usuario === null) return <Navigate to="/login" />;
  if (usuario.tipo === "Cliente") return <h1>Acceso denegado</h1>;

  function editar(producto) {
    setProductoEditado(producto);
    setMostrarFormulario(true);
  }

  return (
    <>
      <h1>Administración Pawchi</h1>
      <p>
        Usuario: {usuario.nombre} · {usuario.tipo}
      </p>
      <h2>Productos</h2>
      {usuario.tipo === "Administrador" && (
        <Button
          onClick={() => {
            setProductoEditado(null);
            setMostrarFormulario(true);
          }}
        >
          Nuevo producto
        </Button>
      )}
      <div className="table-responsive mt-3">
        <table className="table">
          <thead>
            <tr>
              <th>Código</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {datos.productos.map((producto) => (
              <tr key={producto.id}>
                <td>{producto.codigo}</td>
                <td>{producto.nombre}</td>
                <td>
                  <Precio valor={producto.precio} />
                </td>
                <td>
                  {producto.stock}
                  {producto.stockCritico !== null &&
                    producto.stock <= producto.stockCritico &&
                    " · Stock bajo"}
                </td>
                <td>
                  {usuario.tipo === "Administrador" && (
                    <>
                      <Button onClick={() => editar(producto)}>
                        Editar {producto.codigo}
                      </Button>{" "}
                      <Button
                        variant="danger"
                        onClick={() => {
                          if (confirm("¿Eliminar este producto?"))
                            borrarProducto(producto.id);
                        }}
                      >
                        Eliminar {producto.codigo}
                      </Button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {mostrarFormulario && (
        <ProductForm
          key={productoEditado ? productoEditado.id : "nuevo"}
          producto={productoEditado}
          productos={datos.productos}
          categorias={datos.categorias}
          guardarProducto={guardarProducto}
          cancelar={() => setMostrarFormulario(false)}
        />
      )}

      <h2>Resumen del panel</h2>
      <p>
        Compras aprobadas:{" "}
        {
          datos.pedidos.filter((pedido) => pedido.resultado === "aprobado")
            .length
        }
      </p>
      <p>
        Intentos rechazados:{" "}
        {
          datos.pedidos.filter((pedido) => pedido.resultado === "rechazado")
            .length
        }
      </p>
      <h3>Stock crítico</h3>
      <ul>
        {datos.productos
          .filter(
            (producto) =>
              producto.stockCritico !== null &&
              producto.stock <= producto.stockCritico,
          )
          .map((producto) => (
            <li key={producto.id}>
              {producto.nombre}: {producto.stock} unidades
            </li>
          ))}
      </ul>
      {usuario.tipo === "Administrador" && (
        <>
          <CategoriasAdmin
            categorias={datos.categorias}
            guardarCategoria={guardarCategoria}
            borrarCategoria={borrarCategoria}
          />
          <UsuariosAdmin
            usuarios={datos.usuarios}
            pedidos={datos.pedidos}
            guardarUsuario={guardarUsuario}
            editarUsuario={editarUsuario}
          />
        </>
      )}
      <h2>Pedidos</h2>
      {datos.pedidos.length === 0 && <p>Todavía no hay pedidos.</p>}
      {datos.pedidos.map((pedido) => (
        <details key={pedido.id}>
          <summary>
            Pedido {pedido.id} · {pedido.resultado} ·{" "}
            <Precio valor={pedido.total} />
          </summary>
          <p>
            {pedido.envio.nombre} · {pedido.envio.direccion}
          </p>
          <ul>
            {pedido.productos.map((producto) => (
              <li key={producto.id}>
                {producto.nombre} × {producto.cantidad}
              </li>
            ))}
          </ul>
        </details>
      ))}
    </>
  );
}
export default Admin;