import {axiosInstance} from '../helpers/axios-config';

const getUsuarios = () => {
    //para listar el inventario le enviamos la url como parametro
    return axiosInstance.get('usuario', {
        headers: {//los datos viajan en formato json
            'Content-type': "application/json; charset=utf-8"
        }       
    })
}

const crearUsuario = (data) => {
    return axiosInstance.post('usuario', data, {
        headers: {
            'Content-type': "application/json; charset=utf-8"
        }
    })
}

const actualizarUsuario = (usuarioId, data) => {
    return axiosInstance.put(`usuario/${usuarioId}`, data, {
        headers: {
            'Content-type': "application/json; charset=utf-8"        }
    })
}

const getUsuarioPorId = (usuarioId) => {
    //para listar el inventario le enviamos la url como parametro
    return axiosInstance.get(`usuario/${usuarioId}`, {
        headers: {//los datos viajan en formato json
            'Content-type': "application/json; charset=utf-8"
        }       
    })
}

export {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    getUsuarioPorId,
}