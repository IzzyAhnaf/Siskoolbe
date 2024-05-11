import axios from 'axios'
export default axios.create({
    baseURL: 'http://192.168.0.200:5000',
    headers: {
        'Content-type': 'application/json'
    },
    withCredentials: true
})