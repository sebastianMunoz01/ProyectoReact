import { useState } from "react";
import Campo from "../components/molecules/Campo";
import Button from "../components/atoms/Button";
import { correoValido } from "../data/validaciones";

function Contact({ guardarMensaje }) {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [comentario, setComentario] = useState("");
  const [mensaje, setMensaje] = useState("");

  function enviarFormulario(evento) {
    evento.preventDefault();
    if (!nombre.trim() || !comentario.trim()) {
      setMensaje("Completa nombre y comentario.");
      return;
    }
    if (correo !== "" && !correoValido(correo.trim().toLowerCase())) {
      setMensaje("Revisa el correo.");
      return;
    }
    if (guardarMensaje({ nombre, correo, comentario })) {
      setMensaje("Mensaje guardado en este navegador.");
      setNombre("");
      setCorreo("");
      setComentario("");
    }
  }

  return (
    <>
      <h1>Contacto</h1>
      <form noValidate onSubmit={enviarFormulario}>
        <Campo
          id="nombre"
          label="Nombre"
          value={nombre}
          maxLength={100}
          onChange={(e) => setNombre(e.target.value)}
        />
        <Campo
          id="correo"
          label="Correo (opcional)"
          value={correo}
          maxLength={100}
          onChange={(e) => setCorreo(e.target.value)}
        />
        <Campo
          id="comentario"
          label="Comentario"
          value={comentario}
          maxLength={500}
          onChange={(e) => setComentario(e.target.value)}
        />
        <Button type="submit">Guardar mensaje</Button>
        {mensaje !== "" && <p role="status">{mensaje}</p>}
      </form>
    </>
  );
}
export default Contact;