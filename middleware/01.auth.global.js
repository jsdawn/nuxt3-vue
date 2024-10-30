/**
 * 全局路由中间件（后缀为.global），
 * 每次路由变化时自动运行，按字符串排序
 * 运行顺序：全局路由中间件 -> 具名路由中间件
 */

import { getUsers } from '@/api/users';
import { useAppStore } from '@/store/useAppStore';

const NotLoginRoutes = ['/login', '/login/register'];

export default defineNuxtRouteMiddleware(async (to, from) => {
  // console.log('====Middleware global auth====', to, from);

  const store = useAppStore();
  const requireLogin = !NotLoginRoutes.includes(to.path);
  const isLoginPage = to.path == '/login';

  if (requireLogin && !store.token && !isLoginPage) {
    return navigateTo('/login');
  }

  if (import.meta.client) {
    if (store.token && !store.user && !isLoginPage) {
      try {
        const res = await store.getUserInfo();
      } catch (error) {
        store.setToken('');
        return navigateTo('/login');
      }
    }
  } else {
    // ssr逻辑
  }
});
