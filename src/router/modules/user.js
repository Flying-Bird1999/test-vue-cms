const user = {
    path: '/user',
    name: 'user',
    meta:{title:'用户', roles: ['userTeam']},
    component: () => import('../../views/user/index.vue'),
    children: [
        {
            path: 'createUser',
            name: 'createUser',
            meta:{title:'创建用户'},
            component: () => import('../../views/user/createUser.vue')
        },
        {
            path: 'userInfo',
            name: 'userInfo',
            meta:{title:'用户详情'},
            component: () => import('../../views/user/userInfo.vue')
        }
    ]
}
export default user