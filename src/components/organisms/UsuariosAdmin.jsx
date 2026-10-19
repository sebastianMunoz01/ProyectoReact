import { useState } from "react";
import Campo from "../molecules/Campo";
import Select from "../atoms/Select";
import Button from "../atoms/Button";
import UserForm from "./UserForm";

function UsuariosAdmin({ usuarios, pedidos, guardarUsuario, editarUsuario }) {
  const [elegido, setElegido] = useState(null);
  const [nombre, setNombre] = useState("");
  const [tipo, setTipo] = useState("Cliente");
  const [correoHistorial, setCorreoHistorial] = useState("");

  function enviar(evento) {
    evento.preventDefault();
    if (editarUsuario(elegido.id, nombre, tipo)) setElegido(null);
  }

  return (
    <section>
      <h2>Usuarios registrados</h2>
      <ul>
        {usuarios.map((persona) => (
          <li key={persona.id}>
            {persona.nombre} · {persona.correo} · {persona.tipo}{" "}
            <Button
              onClick={() => {
                setElegido(persona);
                setNombre(persona.nombre);
                setTipo(persona.tipo);
              }}
            >
              Editar usuario {persona.correo}
            </Button>{" "}
            <Button
              variant="outline-secondary"
              onClick={() => setCorreoHistorial(persona.correo)}
            >
              Historial {persona.correo}
            </Button>
          </li>
        ))}
      </ul>
      {elegido && (
        <form onSubmit={enviar}>
          <Campo
            id="editarNombre"
            label="Nombre del usuario"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <label htmlFor="editarTipo">Rol del usuario</label>
          <Select
            id="editarTipo"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
          >
            <option>Cliente</option>
            <option>Vendedor</option>
            <option>Administrador</option>
          </Select>
          <Button type="submit">Guardar usuario</Button>{" "}
          <Button onClick={() => setElegido(null)}>Cancelar usuario</Button>
        </form>
      )}
      {correoHistorial !== "" && (
        <div>
          <h3>Historial de {correoHistorial}</h3>
          {pedidos
            .filter((pedido) => pedido.envio.correo === correoHistorial)
            .map((pedido) => (
              <p key={pedido.id}>
                Pedido {pedido.id} · {pedido.resultado}
              </p>
            ))}
          {!pedidos.some(
            (pedido) => pedido.envio.correo === correoHistorial,
          ) && <p>Sin pedidos asociados.</p>}
        </div>
      )}
      <UserForm usuarios={usuarios} guardarUsuario={guardarUsuario} esAdmin />
    </section>
  );
}
export default UsuariosAdmin;