import { useState } from "react"; 
import Campo from "../molecules/Campo"; 
import Select from "../atoms/Select"; 
import Button from "../atoms/Button"; 
function ProductForm({ 
  producto, 
  productos, 
  guardarProducto, 
  categorias, 
  cancelar, 
}) { 
  const [formulario, setFormulario] = useState( 
    producto || { 
      codigo: "", 
      nombre: "", 
      descripcion: "", 
      precio: "", 
      stock: "", 
      stockCritico: "", 
      categoria: categorias[0] || "", 
      imagen: "/img/blindbox-everyday-chaos.png", 
      oferta: false, 
    }, 
  ); 
  const [error, setError] = useState(""); 
  function cambiarCampo(campo, valor) { 
    setFormulario({ ...formulario, [campo]: valor }); 
  } 
  function enviarFormulario(evento) { 
    evento.preventDefault(); 
    if (formulario.codigo.trim().length < 3 || !formulario.nombre.trim()) { 
      setError("Revisa código y nombre."); 
      return; 
    } 
    if ( 
      productos.some( 
        (p) => p.codigo === formulario.codigo.trim() && p.id !== formulario.id, 
      ) 
    ) { 
      setError("Código repetido."); 
      return; 
    } 
    if (!categorias.includes(formulario.categoria)) { 
      setError("Selecciona una categoría."); 
      return; 
    } 
    const precio = Number(formulario.precio); 
    const stock = Number(formulario.stock); 
    const stockCritico = 
      formulario.stockCritico === "" ? null : Number(formulario.stockCritico); 
    if ( 
      formulario.precio === "" || 
      !Number.isFinite(precio) || 
      precio < 0 || 
      formulario.stock === "" || 
      !Number.isInteger(stock) || 
      stock < 0 
    ) { 
      setError("Revisa precio y stock."); 
      return; 
    } 
    if ( 
      stockCritico !== null && 
      (!Number.isInteger(stockCritico) || stockCritico < 0) 
    ) { 
      setError("Stock crítico inválido."); 
      return; 
    } 
    if ( 
      guardarProducto({ 
        ...formulario, 
        codigo: formulario.codigo.trim(), 
        precio, 
        stock, 
        stockCritico, 
      }) 
    ) 
      cancelar(); 
  } 
  return ( 
    <form noValidate onSubmit={enviarFormulario}> 
      <h2>{producto ? "Editar producto" : "Crear producto"}</h2> 
      <Campo 
        id="codigo" 
        label="Código" 
        value={formulario.codigo} 
        onChange={(e) => cambiarCampo("codigo", e.target.value)} 
      /> 
      <Campo 
        id="nombreProducto" 
        label="Nombre del producto" 
        value={formulario.nombre} 
        maxLength={100} 
        onChange={(e) => cambiarCampo("nombre", e.target.value)} 
      /> 
      <Campo 
        id="descripcion" 
        label="Descripción" 
        value={formulario.descripcion} 
        maxLength={500} 
        onChange={(e) => cambiarCampo("descripcion", e.target.value)} 
      /> 
      <Campo 
        id="precio" 
        label="Precio" 
        type="number" 
        value={formulario.precio} 
        onChange={(e) => cambiarCampo("precio", e.target.value)} 
      /> 
      <Campo 
        id="stock" 
        label="Stock" 
        type="number" 
        value={formulario.stock} 
        onChange={(e) => cambiarCampo("stock", e.target.value)} 
      /> 
      <Campo 
        id="stockCritico" 
        label="Stock crítico (opcional)" 
        type="number" 
        value={formulario.stockCritico ?? ""} 
        onChange={(e) => cambiarCampo("stockCritico", e.target.value)} 
      /> 
      <label htmlFor="categoria">Categoría</label> 
      <Select 
        id="categoria" 
        value={formulario.categoria} 
        onChange={(e) => cambiarCampo("categoria", e.target.value)} 
      > 
        {categorias.map((categoria) => ( 
          <option key={categoria}>{categoria}</option> 
        ))} 
      </Select> 
      <label htmlFor="imagen">Imagen</label> 
      <Select 
        id="imagen" 
        value={formulario.imagen} 
        onChange={(e) => cambiarCampo("imagen", e.target.value)} 
      > 
        <option value="img/blindbox-everyday-chaos.png">Everyday Chaos</option> 
        <option value="img/blindbox-fantasy-pups.png">Fantasy Pups</option> 
        <option value="img/blindbox-foodies.png">Foodies</option> 
      </Select> 
      <div className="form-check my-3"> 
        <input 
          id="oferta" 
          className="form-check-input" 
          type="checkbox" 
          checked={formulario.oferta} 
          onChange={(e) => cambiarCampo("oferta", e.target.checked)} 
        /> 
        <label htmlFor="oferta">Mostrar en ofertas</label> 
      </div> 
      {error !== "" && <p role="alert">{error}</p>} 
      <Button type="submit">Guardar producto</Button>{" "} 
      <Button variant="secondary" onClick={cancelar}> 
        Cancelar 
      </Button> 
    </form> 
  ); 
} 
export default ProductForm;