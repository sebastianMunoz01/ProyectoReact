import Link from "../components/atoms/Link";

function Profile({ usuario, pedidos }) {
  if (usuario === null)
    return <Link to="/login">Ingresa para ver tu perfil</Link>;
  return (
    <>
      <h1>Mi perfil</h1>
      <p>
        {usuario.nombre} · {usuario.correo}
      </p>
      <p>
        {usuario.direccion}, {usuario.comuna}
      </p>
      <h2>Mis pedidos</h2>
      {pedidos
        .filter((pedido) => pedido.envio.correo === usuario.correo)
        .map((pedido) => (
          <p key={pedido.id}>
            <Link to={"/compra/" + pedido.id}>Pedido {pedido.id}</Link> ·{" "}
            {pedido.resultado}
          </p>
        ))}
    </>
  );
}
export default Profile;