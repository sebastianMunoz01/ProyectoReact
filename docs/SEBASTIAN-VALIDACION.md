# Validación de Sebastian 

  

Fecha: [10/10/26] 

Commit probado: [salida de git rev-parse HEAD] 

Revisor: [Bryan] 

  

| Caso | Resultado observado | Evidencia | 

|---|---|---| 
| 1. Registro, login, logout, duplicados, permisos y persistencia (F5) | Usuario registrado correctamente, validación de correo/RUN activa, persistencia mantenida tras recargar. | ![registro](<img width="1445" height="838" alt="S2 cuenta creada exitosamente" src="https://github.com/user-attachments/assets/0ec9cef9-4872-4e5f-92d7-bb6e2b794dea" />)| ![validaciones](<img width="1417" height="397" alt="S2 validacion login clave incorrecta" src="https://github.com/user-attachments/assets/b49fc5a2-0e07-4a24-b787-f931a71d0636" />)<br><br>(<img width="1455" height="894" alt="S2 validacion registro rut" src="https://github.com/user-attachments/assets/7de62e6d-e378-4c96-a6ab-984504b603ee" />)<br><br>(<img width="1446" height="818" alt="S2 validacion registro usuario repetido" src="https://github.com/user-attachments/assets/855d8551-f4f3-4bc4-90b8-09314e299f3d" />) |
| 2. Gestión de productos desde panel y reflejo en catálogo/carrito | Creación y edición de productos reflejadas inmediatamente en la tienda y ajustadas en carrito. | ![panel](<img width="1313" height="915" alt="S3 ingreso adminDuoc" src="https://github.com/user-attachments/assets/8e0c74b0-e70d-4443-8992-5aab551272cb" />)<br><br>(<img width="1490" height="895" alt="S3  nuevoProducto exitoso" src="https://github.com/user-attachments/assets/8273126a-b0b3-4d6d-ae41-fa9da5923c3c" />)<br><br>(<img width="1295" height="110" alt="S3  stock y precio editado" src="https://github.com/user-attachments/assets/b345ee77-14d4-4d3b-9b1e-98c9a3c9e3e8" />)<br><br>(<img width="1484" height="860" alt="S3  validacion precio negativo y stock decimal" src="https://github.com/user-attachments/assets/030d0b82-7490-4f22-9a12-4c35a79b6d61" />)<br><br>(<img width="1483" height="838" alt="S3  validacion cod repetido" src="https://github.com/user-attachments/assets/1067c529-7149-4da9-bb95-45fbc8ffed9d" />)<br><br>(<img width="1362" height="352" alt="S3  creacion categoria prueba" src="https://github.com/user-attachments/assets/0310d8fb-a945-447c-8d4a-fa945f4b6a7a" />)<br><br>(<img width="940" height="300" alt="S3  categoria especial eliminada" src="https://github.com/user-attachments/assets/ca983faf-30a2-451b-b874-99fec23fb39f" />)|
| 3. Flujo de compra aprobada/rechazada y actualización de stock | Compra aprobada descuenta stock y vacía carrito; compra rechazada conserva stock y mantiene carrito. |  |
| 4. Perfil de usuario, historial, resumen de compras e inventario bajo | Cada cliente visualiza solo sus pedidos. El panel muestra compras aprobadas/rechazadas y alerta de stock crítico. |  |
| 5. Pruebas automáticas, compilación y diseño responsivo móvil | Ejecución exitosa de suite de pruebas, build de producción correcto y diseño adaptable verificado con Bryan. | |

PR realizados:
  

PR realizados: [gh pr checkout 13(Agrega campos de formulario y pruebas- #13)
                gh pr checkout 14(Agrega registro login contacto y persistencia- #14)
                gh pr checkout 15(Agrega panel y administracion de datos- #15)] 

Problemas encontrados: [ninguno] 

Pendientes: [ninguno]