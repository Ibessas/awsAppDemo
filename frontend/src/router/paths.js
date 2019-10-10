import palestra from '../views/Palestra'
import dashboard from '../views/Dashboard'
import login from '../views/Login'

export default [
  {
    path: '',
    name: '',
    redirect: '/login',
    meta: {
      requiresAuth: false
    },
    component: login
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      requiresAuth: false
    },
    component: login
  },  
  {
        path: '/dashboard',
        name: 'dashboard',
        meta: {
          requiresAuth: true
        },
        component: dashboard
    },
    {
      path: '/palestra',
      name: 'palestra',
      redirect:'/dashboard',
      component: palestra
    },
    {
      path: '/palestra/:id',
      name: 'palestra',
      meta: {
        requiresAuth: true
      },
      component: palestra
    },

  ];
  