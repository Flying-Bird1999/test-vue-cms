import Vue from 'vue';
import VueRouter from 'vue-router';
import user from './modules/user';

const originalReplace = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalReplace.call(this, location).catch((err) => err);
};
Vue.use(VueRouter);

//路由分两个模块： 1、常规配置  2、动态配置

export const constantRoutes = [
  //常规配置
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'login',
    meta: { title: '登录' },
    component: () => import('../views/login/index.vue'),
  },
  {
    path: '/home',
    name: 'home',
    redirect: '/index',
    component: () => import('../layout/index.vue'),
    children: [],
  },
];

export const asyncRouter = [
  {
    path: '/index',
    name: 'index',
    redirect: '/index/banners',
    meta: { title: '首页', roles: ['userTeam', 'notifyOpinion'] },
    component: () => import('../views/home/index.vue'),
    children: [
      {
        path: 'banners',
        name: 'banners',
        meta: { title: '轮播图' },
        component: () => import('../views/home/banners.vue'),
      },
      {
        path: 'judges',
        name: 'judges',
        meta: { title: '裁判队伍' },
        component: () => import('../views/home/judges.vue'),
      },
      {
        path: 'videos',
        name: 'videos',
        meta: { title: '精彩瞬间' },
        component: () => import('../views/home/videos.vue'),
      },
    ],
  },
  user,
  {
    path: '/team',
    name: 'team',
    meta: { title: '队伍', roles: ['userTeam'] },
    component: () => import('../views/team/index.vue'),
    children: [
      {
        path: 'createTeam',
        name: 'createTeam',
        meta: { title: '创建队伍' },
        component: () => import('../views/team/createTeam.vue'),
      },
      {
        path: 'handleTeam',
        name: 'handleTeam',
        meta: { title: '队伍评分' },
        component: () => import('../views/team/handleTeam.vue'),
      },
      {
        path: 'teamInfo',
        name: 'teamInfo',
        meta: { title: '队伍详情' },
        component: () => import('../views/team/teamInfo.vue'),
      },
    ],
  },
  {
    path: '/competition',
    name: 'competition',
    meta: { title: '赛程详情', roles: ['userTeam'] },
    component: () => import('../views/competition/index.vue'),
  },
  {
    path: '/notify',
    name: 'notify',
    meta: { title: '消息通知', roles: ['notifyOpinion'] },
    component: () => import('../views/notify/index.vue'),
  },
  {
    path: '/opinion',
    name: 'opinion',
    meta: { title: '意见反馈', roles: ['notifyOpinion'] },
    component: () => import('../views/opinion/index.vue'),
  },
];

const router = new VueRouter({
  routes: constantRoutes,
});

export default router;

// const routes = [
//     {
//         path: '/',
//         redirect: '/login'
//     },
//     {
//         path: '/login',
//         name: 'login',
//         component: () => import('../views/login/index.vue')
//     },
//     {
//         path: '/home',
//         name: 'home',
//         redirect: '/index',
//         component: () => import('../layout/index.vue'),
//         children: [
//             {
//                 path: '/index',
//                 name: 'index',
//                 redirect: '/index/banners',
//                 meta:{title:'首页'},
//                 component: () => import('../views/home/index.vue'),
//                 children: [
//                     {
//                         path: 'banners',
//                         name: 'banners',
//                         meta:{title:'轮播图'},
//                         component: () => import('../views/home/banners.vue')
//                     },
//                     {
//                         path: 'judges',
//                         name: 'judges',
//                         meta:{title:'裁判队伍'},
//                         component: () => import('../views/home/judges.vue')
//                     },
//                     {
//                         path: 'videos',
//                         name: 'videos',
//                         meta:{title:'精彩瞬间'},
//                         component: () => import('../views/home/videos.vue')
//                     },
//                 ]
//             },
//             {
//                 path: '/user',
//                 name: 'user',
//                 meta:{title:'用户'},
//                 component: () => import('../views/user/index.vue'),
//                 children: [
//                     {
//                         path: 'createUser',
//                         name: 'createUser',
//                         meta:{title:'创建用户'},
//                         component: () => import('../views/user/createUser.vue')
//                     },
//                     {
//                         path: 'userInfo',
//                         name: 'userInfo',
//                         meta:{title:'用户详情'},
//                         component: () => import('../views/user/userInfo.vue')
//                     },
//                 ]
//             },
//             {
//                 path: '/team',
//                 name: 'team',
//                 meta:{title:'队伍'},
//                 component: () => import('../views/team/index.vue'),
//                 children: [
//                     {
//                         path: 'handleTeam',
//                         name: 'handleTeam',
//                         meta:{title:'操作队伍'},
//                         component: () => import('../views/team/handleTeam.vue')
//                     },
//                     {
//                         path: 'teamInfo',
//                         name: 'teamInfo',
//                         meta:{title:'队伍详情'},
//                         component: () => import('../views/team/teamInfo.vue')
//                     },
//                 ]
//             },
//             {
//                 path: '/competition',
//                 name: 'competition',
//                 meta:{title:'赛程详情'},
//                 component: () => import('../views/competition/index.vue'),
//             },
//             {
//                 path: '/notify',
//                 name: 'notify',
//                 meta:{title:'消息通知'},
//                 component: () => import('../views/notify/index.vue'),
//             },
//             {
//                 path: '/opinion',
//                 name: 'opinion',
//                 meta:{title:'意见反馈'},
//                 component: () => import('../views/opinion/index.vue'),
//             }
//         ]
//     }
// ]
