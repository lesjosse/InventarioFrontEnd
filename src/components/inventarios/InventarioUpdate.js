import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getInventarioPorId, actualizarInventario } from "../../services/inventarioService";
import { getUsuarios } from "../../services/usuarioService";
import { getMarcas } from "../../services/marcaService";
import { getTiposEquipos } from "../../services/tipoEquipoService";
import { getEstadosEquipos } from "../../services/estadoEquipoService";
import Swal from "sweetalert2";

export const InventarioUpdate = () => {

  const { inventarioId = "" } = useParams();
  const [usuarios, setUsuarios] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [estados, setEstados] = useState([]);
  const [inventario, setInventario] = useState({});
  const [valoresForm, setValoresForm] = useState({});
  const {
    serial = "",
    model = "",
    description = "",
    color = "",
    photoComputer = "",
    datePurchase = "",
    price = "",
    userCharge,
    brand,
    computerType,
    computerStatus,
  } = valoresForm;

  const listarUsuarios = async () => {
    try {
      const { data } = await getUsuarios();
      setUsuarios(data);
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    listarUsuarios();
  }, []);

  const listarMarcas = async () => {
    try {
      const { data } = await getMarcas();
      setMarcas(data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    listarMarcas();
  }, []);

  const listarTipos = async () => {
    try {
      const { data } = await getTiposEquipos();
      setTipos(data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    listarTipos();
  }, []);

  const listarEstados = async () => {
    try {
      const { data } = await getEstadosEquipos();
      setEstados(data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    listarEstados();
  }, []);

  const getInventario = async () => {
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: "Cargando...",
      });
      Swal.showLoading();
      const { data } = await getInventarioPorId(inventarioId);
      setInventario(data);
      Swal.close()
    } catch (e) {
      console.log(e);
      Swal.close();
    }
  };

  useEffect(() => {
    getInventario();
  }, [inventarioId]);

  useEffect(() => {
      setValoresForm({
        serial: inventario.serial,
        model: inventario.model,
        description: inventario.description,
        color: inventario.color,
        photoComputer: inventario.photoComputer,
        datePurchase: inventario.datePurchase,
        price: inventario.price,
        userCharge: inventario.userCharge,
        brand: inventario.brand,
        computerType: inventario.computerType,
        computerStatus: inventario.computerStatus
      })
    
  }, [inventario])

  const handleOnChange = ({ target }) => {
    const { name, value } = target;
    setValoresForm({ ...valoresForm, [name]: value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const inventario = {
      serial,
      model,
      description,
      color,
      photoComputer,
      datePurchase,
      price,
      userCharge: {
        _id: userCharge,
      },
      brand: {
        _id: brand,
      },
      computerType: {
        _id: computerType,
      },
      computerStatus: {
        _id: computerStatus,
      },
    };
    console.log(inventario);
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: "Cargando...",
      });
      Swal.showLoading();
      const { data } = await actualizarInventario(inventarioId, inventario);
      console.log(data);
      Swal.close();
    } catch (e) {
      console.log(e);
      console.log(e.response.data)
      Swal.close();
      let mensaje;
      if(e && e.response && e.response.data){
        mensaje = e.response.data;  
      }else{
        mensaje = 'Ocurrió un error, por favor intente de nuevo'
      }
      Swal.fire('Error',  mensaje , 'error');
    }
  };

  return (
    <div className="container-fluid mt-3 mb-2">
      <div className="card">
        <div className="card-header">
          <h5 className="card-title">Detalle activo</h5>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-3">
              <img src={inventario?.photoComputer} />
            </div>
            <div className="col-md-9">
              <form onSubmit={(e) => handleOnSubmit(e)}>
                <div className="row">
                  <div className="col">
                    <div className="mb-3">
                      <label className="form-label">Serial</label>
                      <input
                        type="text"
                        name="serial"
                        value={serial}
                        required
                        minLength={4}
                        onChange={(e) => handleOnChange(e)}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div className="mb-3">
                      <label className="form-label">Modelo</label>
                      <input
                        type="text"
                        name="model"
                        value={model}
                        onChange={(e) => handleOnChange(e)}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div className="mb-3">
                      <label className="form-label">Descripcion</label>
                      <input
                        type="text"
                        name="description"
                        value={description}
                        onChange={(e) => handleOnChange(e)}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div className="mb-3">
                      <label className="form-label"> Color</label>
                      <input
                        type="text"
                        name="color"
                        value={color}
                        onChange={(e) => handleOnChange(e)}
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <div className="mb-3">
                      <label className="form-label">Foto</label>
                      <input
                        type="url"
                        name="photoComputer"
                        value={photoComputer}
                        required
                        onChange={(e) => handleOnChange(e)}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div className="mb-3">
                      <label className="form-label">Fecha compra</label>
                      <input
                        type="date"
                        name="datePurchase"
                        value={datePurchase}
                        required
                        onChange={(e) => handleOnChange(e)}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div className="mb-3">
                      <label className="form-label">Precio</label>
                      <input
                        type="number"
                        name="price"
                        value={price}
                        required
                        onChange={(e) => handleOnChange(e)}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div className="mb-3">
                      <label className="form-label"> Usuario</label>
                      <select
                        className="form-select"
                        required
                        onChange={(e) => handleOnChange(e)}
                        name="userCharge"
                        value={userCharge}
                      >
                        <option key="">--SELECCIONE--</option>
                        {usuarios.map(({ _id, name }) => {
                          return (
                            <option key={_id} value={_id}>
                              {name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <div className="mb-3">
                      <label className="form-label">Marca</label>
                      <select
                        className="form-select"
                        required
                        onChange={(e) => handleOnChange(e)}
                        name="brand"
                        value={brand}
                      >
                        <option key="">--SELECCIONE--</option>
                        {marcas.map(({ _id, name }) => {
                          return (
                            <option key={_id} value={_id}>
                              {name}
                            </option>
                          );
                        })}
                      </select>{" "}
                    </div>
                  </div>
                  <div className="col">
                    <div className="mb-3">
                      <label className="form-label">Tipo equipo</label>
                      <select
                        className="form-select"
                        required
                        onChange={(e) => handleOnChange(e)}
                        name="computerType"
                        value={computerType}
                      >
                        <option key="">--SELECCIONE--</option>
                        {tipos.map(({ _id, name }) => {
                          return (
                            <option key={_id} value={_id}>
                              {name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                  <div className="col">
                    <div className="mb-3">
                      <label className="form-label">Estado equipo</label>
                      <select
                        className="form-select"
                        required
                        onChange={(e) => handleOnChange(e)}
                        name="computerStatus"
                        value={computerStatus}
                      >
                        <option key="">--SELECCIONE--</option>
                        {estados.map(({ _id, name }) => {
                          return (
                            <option key={_id} value={_id}>
                              {name}
                            </option>
                          );
                        })}
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
