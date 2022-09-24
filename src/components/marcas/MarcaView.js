import React from "react";
import { useState, useEffect } from "react";
import { getMarcas } from "../../services/marcaService";
import { MarcaNew } from "./MarcaNew";
import { Link } from "react-router-dom";
 import Swal from "sweetalert2";

export const MarcaView = () => {

  const [marcas, setMarcas] = useState([]);
  // const [openModal, setOpenModal] = useState(false);

  const listarMarcas = async () => {
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: "Cargando...",
      });
      Swal.showLoading();
      const { data } = await getMarcas();
      console.log(data);
      setMarcas(data);
       Swal.close()
    } catch (e) {
      console.log(e);
       Swal.close()
    }
  };
  //listar inventario solo se llama una vez cuando cargue el componente
  useEffect(() => {
    listarMarcas();
  }, []);

  // const handleOpenModal = () => {
  //   setOpenModal(!openModal);
  // };

  return (
    <div className="container">
      <MarcaNew listarMarcas={listarMarcas}/>
      <table className="table mt-3 mb-2 table-bordered border-primary ">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Marca equipo</th>
            <th scope="col">Estado</th>
            <th scope="col">Fecha creación</th>
            <th scope="col">Fecha actualización</th>
          </tr>
        </thead>
      </table>

      {marcas.map((marca) => {
        return (
          <div className="table-responsive " key={marca._id}>
            <table className="table align-middle">
            <tbody> 
              <tr>
                <th scope="row">#</th>
                <td>{marca.name}</td>
                <td>{marca.status} </td>
                <td>{marca.creationDate} </td>
                <td>{marca.updateDate} <Link to={`marcas/edit/${marca._id}`}><button type="button" className="btn btn-info">Edit</button></Link></td>
              </tr>
            </tbody>
          </table>
          </div>
        );
      })}
      
    </div>
  );
};
