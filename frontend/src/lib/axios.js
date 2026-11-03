import axios from "axios"

let getAuthToken = null;
let resolveAuthTokenGetter;
const authTokenGetterReady = new Promise((resolve) => {
    resolveAuthTokenGetter = resolve;
});

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_UPL?.replace(/\/+$/, ""),
    withCredentials:true,
})

export const setAuthTokenGetter = (tokenGetter) => {
    getAuthToken = tokenGetter;
    resolveAuthTokenGetter();
};

axiosInstance.interceptors.request.use(async (config) => {
    await authTokenGetterReady;

    if (getAuthToken) {
        const token = await getAuthToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }

    return config;
});

export default axiosInstance;