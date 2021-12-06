import router from './router'
import store from './store'

// 路由拦截
router.beforeEach(async (to, from, next) => {
    // 判断是否是登录页
    if (to.path == '/login') {
        next()
    } else {
        // 登录用户信息（分角色  administrator userTeam notifyOpinion）
        // 正常跳转  vuex中获取角色信息
        let hasRoles = store && store.getters.roles && store.getters.roles.length > 0
        if (hasRoles) {
            next()
        } else {
            try {
                // 页面刷新 或者 第一次登陆
                let roles = await store.dispatch('getInfo')

                // ---------------  动态路由的加载  ---------------
                let roleName = roles.map(item => item.name)
                //传入对应的角色,返回动态路由匹配的结果
                let asyncRoutes = await store.dispatch('GENERATEROUTES',roleName)
                router.addRoutes(asyncRoutes) //动态路由 接收的参数是数组对象
                // ---------------  动态路由加载结束  ---------------

                if (roles) {
                    next({...to})
                } else {
                    next({ path: '/login' })
                }
            }catch (e) {
                next({ path: '/login' })
            }
        }
    }
})


// router.beforeEach(async(to, from, next) => {
//     //1、是否是登录页
//     if (to.path == '/login') {
//         next();
//     } else {
//         //正常登录
//         console.log('login');
//         let R = store && store.getters.roles && store.getters.roles.length > 0;
//         console.log('hasRoles--' + R)
//         if (R) {
//             next();
//         } else {
//             //获取角色
//             var { roles } = await store.dispatch('userinfo');
//             console.log(roles)
//             if (roles) {
//                 next({...to })
//             } else {
//                 console.log(222)
//                 next({ path: '/login' });
//             }
//         }
//     }
// })