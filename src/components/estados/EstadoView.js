import React from "react";
import { useState, useEffect } from "react";
import { getEstadosEquipos } from "../../services/estadoEquipoService";
import { EstadoNew } from "./EstadoNew";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export const EstadoView = () => {
  const [estados, setEstados] = useState([]);
  const listarEstados = async () => {
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: "Cargando...",
      });
      Swal.showLoading();
      const { data } = await getEstadosEquipos();
      console.log(data);
      setEstados(data);
      Swal.close();
    } catch (e) {
      console.log(e);
      Swal.close();
    }
  };
  //listar inventario solo se llama una vez cuando cargue el componente
  useEffect(() => {
    listarEstados();
  }, []);

  // const handleOpenModal = () => {
  //   setOpenModal(!openModal);
  // };

  return (
    <div className="container">
      <EstadoNew listarEstados={listarEstados} />
      <table className="table mt-3 mb-2 table-bordered border-primary">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Estado equipo</th>
            <th scope="col">Estado</th>
            <th scope="col">Fecha creación</th>
            <th scope="col">Fecha actualización</th>
          </tr>
        </thead>
      </table>

      {estados.map((estado) => {
        return (
          <div className="table-responsive" key={estado._id}>
            <table className="table align-middle alin-row-col">
              <tbody>
                <tr>
                  <th scope="row">#</th>
                  <td>{estado.name}</td>
                  <td>{estado.status} </td>
                  <td>{estado.creationDate} </td>
                  <td>
                    {estado.updateDate}{" "}
                    <Link to={`estados/edit/${estado._id}`}>
                      <button type="button" className="btn btn-info">
                        Edit
                      </button>
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
};
