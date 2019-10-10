import Vue from 'vue';
import Router from 'vue-router';
import paths from './paths';


Vue.use(Router);
const router =  new Router({
  base: '',
  mode: 'history',
  linkActiveClass: 'active',
  routes: paths
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('user_id') != null) {
      next()
      return
    }
    else{
      router.push('/login')
    }
  }
  else{}
    next()
})
export default router;
