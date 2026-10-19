export function formatoPrecio(valor) {
  return "$" + Number(valor).toLocaleString("es-CL");
}
function Precio({ valor }) {
  return <strong>{formatoPrecio(valor)}</strong>;
}
export default Precio;