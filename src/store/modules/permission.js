import { constantRoutes,asyncRouter } from "../../router"

function filterAsyncRouter(routes,name) {  //过滤角色
    let data = routes.filter(route => {
        return route.meta && route.meta.roles && route.meta.roles.includes(name)
    })
    return data
}

const state = {
    routes: []
}

const getters = {
    get_routes: state => state.routes
}

const actions = {
    GENERATEROUTES({commit}, rolesName){  //通过角色来过滤路由
        return new Promise((resolve, reject)=>{
            //返回的路由
            let _routes
            // 将常规路由中的home路由过滤出来，并清空其children，方便根据角色添加对应的子路由
            let home = constantRoutes.filter(item => item.path=='/home')[0]
            home.children = []
            // 权限不同 administrator userTeam notifyOpinion
            if (rolesName.includes('administrator')){   //管理员
                home.children = asyncRouter
            } else {
                let name = rolesName[0]
                let filterRouter = filterAsyncRouter(asyncRouter,name)
                home.children = filterRouter
            }
            // 返回的应该是数组对象
            _routes = [home] || []
            commit('SET_ROUTES',_routes)
            resolve(_routes)
        })
    }
}

const mutations = {
    SET_ROUTES(state, routes){
        state.routes = routes
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}