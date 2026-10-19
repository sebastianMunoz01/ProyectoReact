import { useState } from 'react';
import Campo from '../components/molecules/Campo';
import Direccion from '../components/molecules/Direccion';
import Select from '../components/atoms/Select';
import Button from '../components/atoms/Button';
import { calcularTotalCarrito } from '../data/carrito';
import { correoValido } from '../data/validaciones';

function Checkout({ carrito, realizarCompra }) {
  const [formulario, setFormulario] = useState({
    nombre: '',
    correo: '',
    direccion: '',
    region: '',
    comuna: '',
    entrega: 'retiro',
    resultado: 'aprobado',
  });

  const [mensaje, setMensaje] = useState('');

  function cambiarCampo(campo, valor) {
    const nuevosDatos = {
      ...formulario,
      [campo]: valor,
    };

    if (campo === 'region') {
      nuevosDatos.comuna = '';
    }

    setFormulario(nuevosDatos);
  }

  function enviarFormulario(evento) {
    evento.preventDefault();

    if (!formulario.nombre.trim()) {
      setMensaje('Completa tu nombre.');
      return;
    }

    const correo = formulario.correo.trim().toLowerCase();

    if (!correoValido(correo)) {
      setMensaje('Revisa tu correo.');
      return;
    }

    if (
      formulario.entrega === 'domicilio' &&
      (
        !formulario.direccion.trim() ||
        !formulario.region ||
        !formulario.comuna
      )
    ) {
      setMensaje('Completa la dirección, región y comuna.');
      return;
    }

    setMensaje('');

    realizarCompra({
      ...formulario,
      nombre: formulario.nombre.trim(),
      correo: correo,
    });
  }

  if (carrito.length === 0) {
    return (
      <>
        <h1>Finalizar compra</h1>
        <p>Agrega productos al carrito antes de continuar.</p>
      </>
    );
  }

  const subtotal = calcularTotalCarrito(carrito);
  const costoEnvio = formulario.entrega === 'domicilio' ? 2990 : 0;
  const total = subtotal + costoEnvio;

  return (
    <>
      <h1>Finalizar compra</h1>

      <form noValidate onSubmit={enviarFormulario}>
        <Campo
          id="nombreCompra"
          label="Nombre"
          value={formulario.nombre}
          maxLength={100}
          onChange={(evento) =>
            cambiarCampo('nombre', evento.target.value)
          }
        />

        <Campo
          id="correoCompra"
          label="Correo"
          type="email"
          value={formulario.correo}
          maxLength={100}
          onChange={(evento) =>
            cambiarCampo('correo', evento.target.value)
          }
        />

        <div className="mb-3">
          <label htmlFor="entregaCompra" className="form-label">
            Forma de entrega
          </label>

          <Select
            id="entregaCompra"
            value={formulario.entrega}
            onChange={(evento) =>
              cambiarCampo('entrega', evento.target.value)
            }
          >
            <option value="retiro">Retiro gratuito</option>
            <option value="domicilio">Domicilio por $2.990</option>
          </Select>
        </div>

        {formulario.entrega === 'domicilio' && (
          <Direccion
            formulario={formulario}
            cambiarCampo={cambiarCampo}
          />
        )}

        <div className="mb-3">
          <label htmlFor="resultadoCompra" className="form-label">
            Resultado del pago simulado
          </label>

          <Select
            id="resultadoCompra"
            value={formulario.resultado}
            onChange={(evento) =>
              cambiarCampo('resultado', evento.target.value)
            }
          >
            <option value="aprobado">Aprobado</option>
            <option value="rechazado">Rechazado</option>
          </Select>
        </div>

        <p>Subtotal: ${subtotal.toLocaleString('es-CL')}</p>
        <p>Envío: ${costoEnvio.toLocaleString('es-CL')}</p>

        <p className="fw-bold">
          Total: ${total.toLocaleString('es-CL')}
        </p>

        {mensaje !== '' && (
          <p role="alert" className="text-danger">
            {mensaje}
          </p>
        )}

        <Button type="submit">
          Confirmar compra simulada
        </Button>
      </form>
    </>
  );
}

export default Checkout;