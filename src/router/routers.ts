const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue')
  }
]
export default routes
