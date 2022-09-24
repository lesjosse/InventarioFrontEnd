import {axiosInstance} from '../helpers/axios-config';

const getMarcas = () => {
    //para listar el inventario le enviamos la url como parametro
    return axiosInstance.get('marca', {
        headers: {//los datos viajan en formato json
            'Content-type': 'application-json'
        }       
    })
}

const crearMarca = (data) => {
    return axiosInstance.post('marca', data, {
        headers: {
            'Content-type': "application/json; charset=utf-8"
        }
    })
}

const actualizarMarca = (marcaId, data) => {
    return axiosInstance.put(`marca/${marcaId}`, data, {
        headers: {
            'Content-type': "application/json; charset=utf-8"
        }
    })
}

const getMarcaPorId = (marcaId) => {
    //para listar el inventario le enviamos la url como parametro
    return axiosInstance.get(`marca/${marcaId}`, {
        headers: {//los datos viajan en formato json
            'Content-type': "application/json; charset=utf-8"
        }       
    })
}

export {
    getMarcas,
    crearMarca,
    actualizarMarca,
    getMarcaPorId,
}