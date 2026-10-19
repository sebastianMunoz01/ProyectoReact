import Campo from "./Campo";
import Select from "../atoms/Select";
import { regiones } from "../../data/Regiones";

function Direccion({ formulario, cambiarCampo }) {
  const regionElegida = regiones.find(
    (region) => region.nombre === formulario.region,
  );
  return (
    <>
      <Campo
        id="direccion"
        label="Dirección"
        value={formulario.direccion}
        maxLength={300}
        onChange={(e) => cambiarCampo("direccion", e.target.value)}
      />
      <div className="mb-3">
        <label htmlFor="region">Región</label>
        <Select
          id="region"
          value={formulario.region}
          onChange={(e) => cambiarCampo("region", e.target.value)}
        >
          <option value="">Seleccione</option>
          {regiones.map((region) => (
            <option key={region.nombre}>{region.nombre}</option>
          ))}
        </Select>
      </div>
      <div className="mb-3">
        <label htmlFor="comuna">Comuna</label>
        <Select
          id="comuna"
          value={formulario.comuna}
          onChange={(e) => cambiarCampo("comuna", e.target.value)}
        >
          <option value="">Seleccione</option>
          {regionElegida &&
            regionElegida.comunas.map((comuna) => (
              <option key={comuna}>{comuna}</option>
            ))}
        </Select>
      </div>
    </>
  );
}
export default Direccion;