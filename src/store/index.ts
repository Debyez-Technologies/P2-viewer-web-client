import axios from "axios";
// 1. Create a specific instance (Best Practice)
// This prevents polluting the global axios object

// 2. Add a Request Interceptor
axios.interceptors.request.use(
    (config) => {
        // This runs before every request
        const token = localStorage.getItem('token');
        
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axios;