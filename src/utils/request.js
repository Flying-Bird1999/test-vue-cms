import axios from 'axios'
import { getToken } from "./token"
import { Message } from 'element-ui'

// const baseURL = 'http://localhost:3000/admin/'
const baseURL = 'http://120.25.203.54:3000/admin/'
const axiosInstance = axios.create ({
    baseURL: baseURL
});

axiosInstance.interceptors.request.use(config => {
    if (config.url !== 'login/adminLogin'){
        config.headers['authorization'] = "Bearer " + getToken()
    }
    return config
}, err => {
    return Promise.reject(err);
})

axiosInstance.interceptors.response.use(res => {
    if (res.data.code === 403){
        Message({
            message: 'token不存在或已过期，请重新登录',
            type: 'warning',
            duration: 2000
        });
    }
    return res
}, err => {
    Message({
        showClose: true,
        message: err.message,
        type: 'error'
    });
    return Promise.reject(err);
})

export default axiosInstance