
import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:8070',
    timeout: 25000,
    headers: { Accept: 'application/json' },
    withCredentials : true
})

export function setAuthToken(authtoken) {
    api.defaults.headers.common['Authorization'] = authtoken

}


export default api