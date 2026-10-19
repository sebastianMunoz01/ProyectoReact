import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Campo from "../components/molecules/Campo";
import Button from "../components/atoms/Button";

function Login({ usuarios, iniciarSesion }) {
  const [correo, setCorreo] = useState("");
  const [clave, setClave] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function enviarFormulario(evento) {
    evento.preventDefault();
    const usuario = usuarios.find(
      (usuario) =>
        usuario.correo === correo.trim().toLowerCase() &&
        usuario.clave === clave,
    );
    if (!usuario) {
      setError("Correo o clave incorrectos.");
      return;
    }
    iniciarSesion(usuario);
    if (usuario.tipo === "Cliente") navigate("/");
    else navigate("/admin");
  }

  return (
    <>
      <h1>Ingresar</h1>
      <form onSubmit={enviarFormulario}>
        <Campo
          id="correo"
          label="Correo"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
        />
        <Campo
          id="clave"
          label="Clave"
          type="password"
          value={clave}
          onChange={(e) => setClave(e.target.value)}
        />
        {error !== "" && (
          <p role="alert" className="text-danger">
            {error}
          </p>
        )}
        <Button type="submit">Ingresar</Button>
      </form>
    </>
  );
}
export default Login;