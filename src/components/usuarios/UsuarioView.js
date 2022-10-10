import React from "react";
import { useState, useEffect } from "react";
import { getUsuarios } from "../../services/usuarioService";
import { UsuarioNew } from "./UsuarioNew";
import { Link } from "react-router-dom";
 import Swal from "sweetalert2";

export const UsuarioView = () => {
  //creamos variable de usuario que nos devuelve un arreglo
  const [usuarios, setUsuarios] = useState([]);

  const listarUsuarios = async () => {
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: "Cargando...",
      });
      Swal.showLoading();
      const { data } = await getUsuarios();
      console.log(data);
      setUsuarios(data);
       Swal.close()
    } catch (e) {
      console.log(e);
       Swal.close()
    }
  };
  //listar inventario solo se llama una vez cuando cargue el componente
  useEffect(() => {
    listarUsuarios();
  }, []);

  return (
    <div className="container">
      <UsuarioNew listarUsuarios={listarUsuarios} />
      <table className="table mt-3 mb-2 table-bordered border-primary ">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Email</th>
            <th scope="col">status</th>
            <th scope="col">Fecha creación</th>
            <th scope="col">Fecha actualización</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario, num) => {
            return (
              <tr key={usuario._id}>
                <th scope="row">{num + 1}</th>
                <td>{usuario.name}</td>
                <td>{usuario.email}</td>
                <td>{usuario.status} </td>
                <td>{usuario.creationDate} </td>
                <td>{usuario.updateDate} </td>
                <td className="text-center">
                  <Link to={`usuarios/edit/${usuario._id}`}>
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
