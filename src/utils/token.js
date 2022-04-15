const tokenKey = 'admin-token'
const usernameKey = 'username'

// 设置token
export function setToken(token) {
    return localStorage.setItem(tokenKey, token)
}
// 获取token
export function getToken() {
    return localStorage.getItem(tokenKey)
}
// 移除token 
export function removeToken() {
    return localStorage.removeItem(tokenKey)
}

// 设置username
export function setUsername(username) {
    return localStorage.setItem(usernameKey, username);
}
// 获取username
export function getUsername() {
    return localStorage.getItem(usernameKey);
}
// 移除username
export function removeUsername() {
    return localStorage.removeItem(usernameKey);
}