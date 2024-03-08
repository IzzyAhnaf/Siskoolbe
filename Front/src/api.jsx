import axios from 'axios'
export default axios.create({
    baseURL: 'http://127.0.0.1:5000',
    // baseURL: 'https://kk0sjfrs-5000.asse.devtunnels.ms/',
    headers: {
        'Content-type': 'application/json'
    },
    withCredentials: true
})