import { axiosInstance } from "../helpers/axios-config";

const getInventarios = () => {
  //para listar el inventario le enviamos la url como parametro
  return axiosInstance.get("inventario", {
    headers: {
      //los datos viajan en formato json
      "Content-type": "application-json",
    },
  });
};

const crearInventario = (data) => {
  return axiosInstance.post("inventario", data, {
    headers: {
      "Content-type": "application/json; charset=utf-8",
    },
  });
};

const actualizarInventario = (inventarioId, data) => {
  return axiosInstance.put(`inventario/${inventarioId}`, data, {
    headers: {
      "Content-type": "application/json; charset=utf-8",
    },
  });
};

const getInventarioPorId = (inventarioId) => {
  //para listar el inventario le enviamos la url como parametro
  return axiosInstance.get(`inventario/${inventarioId}`, {
    headers: {
      //los datos viajan en formato json
      "Content-type": "application/json; charset=utf-8",
    },
  });
};

export {
  getInventarios,
  crearInventario,
  actualizarInventario,
  getInventarioPorId,
};
