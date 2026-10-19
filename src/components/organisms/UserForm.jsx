import { useState } from "react";
import Campo from "../molecules/Campo";
import Direccion from "../molecules/Direccion";
import Select from "../atoms/Select";
import Button from "../atoms/Button";
import { runValido, correoValido } from "../../data/validaciones";

function UserForm({ usuarios, guardarUsuario, esAdmin = false }) {
  const inicial = {
    run: "",
    nombre: "",
    apellidos: "",
    correo: "",
    clave: "",
    direccion: "",
    region: "",
    comuna: "",
  };
  const [formulario, setFormulario] = useState(inicial);
  const [mensaje, setMensaje] = useState("");
  const [tipo, setTipo] = useState("Cliente");

  function cambiarCampo(campo, valor) {
    const nuevoFormulario = { ...formulario, [campo]: valor };
    if (campo === "region") nuevoFormulario.comuna = "";
    setFormulario(nuevoFormulario);
  }

  function enviarFormulario(evento) {
    evento.preventDefault();
    const correo = formulario.correo.trim().toLowerCase();
    if (!runValido(formulario.run)) {
      setMensaje("Revisa el RUN sin puntos ni guion.");
      return;
    }
    if (!formulario.nombre.trim() || !formulario.apellidos.trim()) {
      setMensaje("Completa nombre y apellidos.");
      return;
    }
    if (!correoValido(correo)) {
      setMensaje("Usa un correo duoc.cl, profesor.duoc.cl o gmail.com.");
      return;
    }
    if (formulario.clave.length < 4 || formulario.clave.length > 10) {
      setMensaje("La clave debe tener entre 4 y 10 caracteres.");
      return;
    }
    if (
      !formulario.direccion.trim() ||
      !formulario.region ||
      !formulario.comuna
    ) {
      setMensaje("Completa la dirección, región y comuna.");
      return;
    }
    if (
      usuarios.some(
        (usuario) =>
          usuario.correo === correo || usuario.run === formulario.run,
      )
    ) {
      setMensaje("Correo o RUN repetido.");
      return;
    }
    const nuevoUsuario = {
      ...formulario,
      correo: correo,
      tipo: esAdmin ? tipo : "Cliente",
      id: Date.now(),
    };
    if (guardarUsuario(nuevoUsuario)) {
      setMensaje("Cuenta creada. Ya puedes ingresar.");
      setFormulario(inicial);
    }
  }

  return (
    <>
      {esAdmin ? <h2>Crear usuario</h2> : <h1>Registro</h1>}
      <form noValidate onSubmit={enviarFormulario}>
        <Campo
          id="run"
          label="RUN sin puntos ni guion"
          value={formulario.run}
          maxLength={9}
          onChange={(e) => cambiarCampo("run", e.target.value)}
        />
        <Campo
          id="nombre"
          label="Nombre"
          value={formulario.nombre}
          maxLength={50}
          onChange={(e) => cambiarCampo("nombre", e.target.value)}
        />
        <Campo
          id="apellidos"
          label="Apellidos"
          value={formulario.apellidos}
          maxLength={100}
          onChange={(e) => cambiarCampo("apellidos", e.target.value)}
        />
        <Campo
          id="correo"
          label="Correo"
          value={formulario.correo}
          maxLength={100}
          onChange={(e) => cambiarCampo("correo", e.target.value)}
        />
        <Campo
          id="clave"
          label="Clave"
          type="password"
          value={formulario.clave}
          onChange={(e) => cambiarCampo("clave", e.target.value)}
        />
        <Direccion formulario={formulario} cambiarCampo={cambiarCampo} />
        {mensaje !== "" && <p role="status">{mensaje}</p>}
        {esAdmin && (
          <>
            <label htmlFor="tipo">Tipo de usuario</label>
            <Select
              id="tipo"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
            >
              <option>Cliente</option>
              <option>Vendedor</option>
              <option>Administrador</option>
            </Select>
          </>
        )}
        <Button type="submit">Crear cuenta</Button>
      </form>
    </>
  );
}
export default UserForm;