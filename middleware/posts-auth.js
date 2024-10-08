
/**
 * 具名路由中间件，在引用了该中间件的指定页面运行
 * definePageMeta({ middleware: 'posts-auth' })
 */
export default defineNuxtRouteMiddleware((to, from) => {
  // console.log('====Middleware posts-auth====', to, from);
  // return navigateTo('/login');
});
