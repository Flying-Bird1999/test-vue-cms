import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI);
import './styles/index.scss'

// 引入全局自定义filters
import './filters/index'
// 路由拦截
import './permission.js'

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
