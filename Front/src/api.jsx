import axios from 'axios'
export default axios.create({
    baseURL: 'http://192.168.0.200:5000',
    // baseURL: 'https://kk0sjfrs-5000.asse.devtunnels.ms/',
    headers: {
        'Content-type': 'application/json'
    },
    withCredentials: true
})