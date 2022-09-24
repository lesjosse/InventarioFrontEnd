import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMarcaPorId,  actualizarMarca, getMarcas } from "../../services/marcaService";
import Swal from "sweetalert2";

export const MarcaUpdate = () => {
  const { marcaId = "" } = useParams();
  const [marca, setMarca] = useState({});
  const [valoresForm, setValoresForm] = useState({});
  const { name = "", status = "" } = valoresForm;

  const listarMarcas = async () => {
    try {
      const { data } = await getMarcas();
      setMarca(data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    listarMarcas();
  }, []);

  const getMarca = async () => {
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: "Cargando...",
      });
      Swal.showLoading();
      const { data } = await getMarcaPorId(marcaId);
      setMarca(data);
      Swal.close();
    } catch (e) {
      console.log(e);
      Swal.close();
    }
  };

  useEffect(() => {
    getMarca();
  }, [marcaId]);

  useEffect(() => {
    setValoresForm({
      name: marca.name,
      status: marca.status,
    });
  }, [marca]);

  const handleOnChange = ({ target }) => {
    const { name, value } = target;
    setValoresForm({ ...valoresForm, [name]: value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const marca = {
      name, 
      status,
    };
    console.log(marca);
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: "Cargando...",
      });
      Swal.showLoading();
      const { data } = await actualizarMarca(marcaId, marca);
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
          <h5 className="card-title">Detalle marca</h5>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-9">
              <form onSubmit={(e) => handleOnSubmit(e)}>
                <div className="row">
                  <div className="col">
                    <div className="mb-3">
                      <label className="form-label">Nombre marca</label>
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