import { axiosInstance } from "../helpers/axios-config";

const getEstadosEquipos = () => {
  //para listar el estado-equipo le enviamos la url como parametro
  return axiosInstance.get("estado-equipo", {
    headers: {
      //los datos viajan en formato json
      "Content-type": "application-json",
    },
  });
};

const crearEstadoEquipo = (data) => {
  return axiosInstance.post("estado-equipo", data, {
    headers: {
      "Content-type": "application/json; charset=utf-8",
    },
  });
};

const actualizarEstadoEquipo = (estadoEquipoId, data) => {
  return axiosInstance.put(`estado-equipo/${estadoEquipoId}`, data, {
    headers: {
      "Content-type": "application/json; charset=utf-8",
    },
  });
};

const getEstadoEquipoPorId = (estadoEquipoId) => {
  //para listar el inventario le enviamos la url como parametro
  return axiosInstance.get(`estado-equipo/${estadoEquipoId}`, {
    headers: {
      //los datos viajan en formato json
      "Content-type": "application/json; charset=utf-8",
    },
  });
};

export {
  getEstadosEquipos,
  crearEstadoEquipo,
  actualizarEstadoEquipo,
  getEstadoEquipoPorId,
};
