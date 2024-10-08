/**
 * 全局路由中间件（后缀为.global），
 * 每次路由变化时自动运行，按字符串排序
 * 运行顺序：全局路由中间件 -> 具名路由中间件
 */

export default defineNuxtRouteMiddleware((to, from) => {
  // console.log('====Middleware global auth====', to, from);
});
