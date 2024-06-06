import BasicLayout from '@/layouts/BasicLayout.vue'
import ChatLayout from '@/layouts/ChatLayout.vue'

export const routes = [
  {
    path: '/',
    name: '主页',
    component: () => import(/* webpackChunkName: "home" */ '../views/home/HomeView.vue'),
    meta: {
      // hideInMenu: true,
      layout: BasicLayout
    }
  },
  {
    path: '/chat',
    name: 'chatgpt',
    component: () => import(/* webpackChunkName: "home" */ '../views/chat/ChatView.vue'),
    meta: {
      // hideInMenu: true,
      layout: ChatLayout
    }
  },
  {
    path: '/noAuth',
    name: '无权限',
    component: () => import(/* webpackChunkName: "401" */ '../views/error/UnauthorizedError.vue'),
    meta: {
      // hideInMenu: true,
      layout: BasicLayout
    }
  },
  {
    path: '/404',
    name: '404',
    component: () => import(/* webpackChunkName: "404" */ '../views/error/PageNotFound.vue'),
    meta: {
      hideInMenu: true,
      layout: BasicLayout
    }
  },
  {
    path: '/:pathMatch(.*)', // 匹配所有路由
    redirect: '/404'
  }
]
