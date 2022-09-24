import {axiosInstance} from '../helpers/axios-config';

const getTiposEquipos = () => {
    //para listar el inventario le enviamos la url como parametro
    return axiosInstance.get('tipo-equipo', {
        headers: {//los datos viajan en formato json
            'Content-type': 'application-json'
        }       
    })
}

const crearTipoEquipo = (data) => {
    return axiosInstance.post('tipo-equipo', data, {
        headers: {
            'Content-type':"application/json; charset=utf-8"
        }
    })
}

const actualizarTipoEquipo = (tipoEquipoId, data) => {
    return axiosInstance.put(`tipo-equipo/${tipoEquipoId}`, data, {
        headers: {
            'Content-type':"application/json; charset=utf-8"
        }
    })
}

const getTipoEquipoPorId = (tipoEquipoId) => {
    //para listar el inventario le enviamos la url como parametro
    return axiosInstance.get(`tipo-equipo/${tipoEquipoId}`, {
        headers: {//los datos viajan en formato json
            'Content-type': "application/json; charset=utf-8"
        }       
    })
}

export {
    getTiposEquipos,
    crearTipoEquipo,
    actualizarTipoEquipo,
    getTipoEquipoPorId,
}