import React from "react";
import { useState, useEffect } from "react";
import { getTiposEquipos } from "../../services/tipoEquipoService";
import { TipoNew } from "./TipoNew";
import { Link } from "react-router-dom";
// import { UsuarioNew } from "./UsuarioNew.js";
 import Swal from "sweetalert2";

export const TipoView = () => {
  //creamos variable de estado que nos devuelve un arreglo
  const [tipos, setTipos] = useState([]);
  // const [openModal, setOpenModal] = useState(false);

  const listarTipos = async () => {
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: "Cargando...",
      });
      Swal.showLoading();
      const { data } = await getTiposEquipos();
      console.log(data);
      setTipos(data);
       Swal.close()
    } catch (e) {
      console.log(e);
       Swal.close()
    }
  };
  //listar inventario solo se llama una vez cuando cargue el componente
  useEffect(() => {
    listarTipos();
  }, []);

  // const handleOpenModal = () => {
  //   setOpenModal(!openModal);
  // };

  return (
    <div className="container">
      <TipoNew listarTipos={listarTipos} />
      <table className="table mt-3 mb-2 table-bordered border-primary ">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Tipo equipo</th>
            <th scope="col">Estado</th>
            <th scope="col">Fecha creación</th>
            <th scope="col">Fecha actualización</th>
            <th scope="col">Acciones</th>

          </tr>
        </thead>
        <tbody>
          {tipos.map((tipo) => {
            return (
              <tr key={tipo._id}>
                <th scope="row"></th>
                <td>{tipo.name}</td>
                <td>{tipo.status} </td>
                <td>{tipo.creationDate} </td>
                <td>{tipo.updateDate} </td>
                <td className="text-center">
                  <Link to={`tipos/edit/${tipo._id}`}>
                    <button type="button" className="btn btn-info">
                      Edit
                    </button>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

