import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'https://inventario-fullstack-iud.herokuapp.com/'
})

export{
    axiosInstance
}