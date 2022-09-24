import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getUsuarioPorId,
  actualizarUsuario,
} from "../../services/usuarioService";
import { getUsuarios } from "../../services/usuarioService";
import Swal from "sweetalert2";

export const UsuarioUpdate = () => {
  const { usuarioId = "" } = useParams();
  const [usuario, setUsuario] = useState({});
  const [valoresForm, setValoresForm] = useState({});
  const { name = "", email = "", status = "" } = valoresForm;

  const listarUsuarios = async () => {
    try {
      const { data } = await getUsuarios();
      setUsuario(data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    listarUsuarios();
  }, []);

  const getUsuario = async () => {
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: "Cargando...",
      });
      Swal.showLoading();
      const { data } = await getUsuarioPorId(usuarioId);
      setUsuario(data);
      Swal.close();
    } catch (e) {
      console.log(e);
      Swal.close();
    }
  };

  useEffect(() => {
    getUsuario();
  }, [usuarioId]);

  useEffect(() => {
    setValoresForm({
      name: usuario.name,
      email: usuario.email,
      status: usuario.status,
    });
  }, [usuario]);

  const handleOnChange = ({ target }) => {
    const { name, value } = target;
    setValoresForm({ ...valoresForm, [name]: value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const usuario = {
      name,
      email,
      status,
    };
    console.log(usuario);
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: "Cargando...",
      });
      Swal.showLoading();
      const { data } = await actualizarUsuario(usuarioId, usuario);
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
          <h5 className="card-title">Detalle Usuario</h5>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-9">
              <form onSubmit={(e) => handleOnSubmit(e)}>
                <div className="row">
                  <div className="col">
                    <div className="mb-3">
                      <label className="form-label">Nombre</label>
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
                      <label className="form-label">Email</label>
                      <input
                        type="text"
                        name="email"
                        value={email}
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
