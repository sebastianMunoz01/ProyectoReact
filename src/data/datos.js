import { productosBase } from "./Productos"; 

const claveDatos = "pawchiClase"; 
export function datosIniciales() { 
  return { 
    categorias: ["Cotidianos", "Fantasia", "Comida"], 
    productos: productosBase.map((producto) => ({ 
      ...producto, 
      oferta: producto.id === 3, 
    })), 
    usuarios: [ 
      { 
        id: 1, 
        nombre: "Admin", 
        correo: "admin@duoc.cl", 
        clave: "1234", 
        tipo: "Administrador", 
      }, 
      { 
        id: 2, 
        nombre: "Vendedor", 
        correo: "vendedor@duoc.cl", 
        clave: "1234", 
        tipo: "Vendedor", 
      }, 
    ], 
    carrito: [], 
    pedidos: [], 
    mensajes: [], 
  }; 
} 
  
export function leerDatos() { 
  const texto = localStorage.getItem(claveDatos); 
  if (texto === null) return datosIniciales(); 
  try { 
    return JSON.parse(texto); 
  } catch { 
    return datosIniciales(); 
  } 
} 

export function guardarDatos(datos) { 
  localStorage.setItem(claveDatos, JSON.stringify(datos)); 
} 
  
export function buscarProducto(productos, id) { 
  return productos.find((producto) => producto.id === Number(id)); 
} 

export function crearProducto(productos, producto) { 
  let idNuevo = 1; 
  for (let i = 0; i < productos.length; i++) { 
    if (productos[i].id >= idNuevo) idNuevo = productos[i].id + 1; 
  } 
  return [...productos, { ...producto, id: idNuevo }]; 
} 

export function actualizarProducto(productos, productoEditado) { 
  return productos.map((producto) => { 
    if (producto.id === productoEditado.id) return productoEditado; 
    return producto; 
  }); 
} 
  
export function eliminarProducto(productos, id) { 
  return productos.filter((producto) => producto.id !== id); 
} 

export function calcularTotal(carrito) { 
  let total = 0; 
  for (let i = 0; i < carrito.length; i++) { 
    total = total + carrito[i].precio * carrito[i].cantidad; 
  } 
  return total; 
} 