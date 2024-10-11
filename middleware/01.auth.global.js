/**
 * 全局路由中间件（后缀为.global），
 * 每次路由变化时自动运行，按字符串排序
 * 运行顺序：全局路由中间件 -> 具名路由中间件
 */

import { getUser } from '@/api/user';
import { useAppStore } from '@/store/useAppStore';

const NotLoginRoutes = ['/login', '/login/register'];

export default defineNuxtRouteMiddleware(async (to, from) => {
  console.log('====Middleware global auth====', to, from);

  const store = useAppStore();
  const requireLogin = !NotLoginRoutes.includes(to.path);

  if (requireLogin && !store.token) {
    return navigateTo('/login');
  }

  if (store.token && !store.user) {
    try {
      const res = await getUser();
      store.setUser(res.data);
      console.log(res);
    } catch (error) {
      // store.setToken('');
      // return navigateTo('/login');
    }
  }
});
