import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getTipoEquipoPorId,
  actualizarTipoEquipo,
} from "../../services/tipoEquipoService";
import { getTiposEquipos } from "../../services/tipoEquipoService";
import Swal from "sweetalert2";

export const TipoUpdate = () => {
  const { tipoId = "" } = useParams();
  const [tipo, setTipo] = useState({});
  const [valoresForm, setValoresForm] = useState({});
  const { name = "", status = "" } = valoresForm;

  const listarTipos = async () => {
    try {
      const { data } = await getTiposEquipos();
      setTipo(data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    listarTipos();
  }, []);

  const getTipoEquipo = async () => {
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: "Cargando...",
      });
      Swal.showLoading();
      const { data } = await getTipoEquipoPorId(tipoId);
      setTipo(data);
      Swal.close();
    } catch (e) {
      console.log(e);
      Swal.close();
    }
  };

  useEffect(() => {
    getTipoEquipo();
  }, [tipoId]);

  useEffect(() => {
    setValoresForm({
      name: tipo.name,
      status: tipo.status,
    });
  }, [tipo]);

  const handleOnChange = ({ target }) => {
    const { name, value } = target;
    setValoresForm({ ...valoresForm, [name]: value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const tipo = {
      name, 
      status,
    };
    console.log(tipo);
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: "Cargando...",
      });
      Swal.showLoading();
      const { data } = await actualizarTipoEquipo(tipoId, tipo);
      console.log(data);
      Swal.close();
    } catch (e) {
      console.log(e);
      console.log(e.response.data);
      Swal.close();
      let mensaje;
      if (e && e.response && e.response.data) {
        mensaje = e.response.data;
      } else {
        mensaje = "Ocurrió un error, por favor intente de nuevo";
      }
      Swal.fire("Error", mensaje, "error");
    }
  };

  return (
    <div className="container-fluid mt-3 mb-2">
      <div className="card">
        <div className="card-header">
          <h5 className="card-title">Detalle tipo</h5>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-9">
              <form onSubmit={(e) => handleOnSubmit(e)}>
                <div className="row">
                  <div className="col">
                    <div className="mb-3">
                      <label className="form-label">Nombre tipo</label>
                      <input
                        type="text"
                        name="name"
                        value={name}
                        required
                        minLength={4}
                        onChange={(e) => handleOnChange(e)}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div className="mb-3">
                      <label className="form-label">Status</label>
                      <select
                        className="form-select"
                        onChange={(e) => handleOnChange(e)}
                        name="status"
                        value={status}
                        required
                      >
                        <option key="">--SELECCIONE--</option>
                        <option>Activo</option>
                        <option>Inactivo</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <button className="btn btn-primary">Actualizar</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
