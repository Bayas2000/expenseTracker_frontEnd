
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

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      delete api.defaults.headers.common["Authorization"];
      // Redirect to login page
      window.location.href = "/login"; 
    }
    return Promise.reject(error);
  }
);

export default api