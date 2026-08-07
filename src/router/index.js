import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { path: '/',        name: 'home',    component: () => import('../views/HomeView.vue'),    meta: { title: '首页' } },
  { path: '/gallery', name: 'gallery', component: () => import('../views/GalleryView.vue'), meta: { title: '照片展示区' } },
  { path: '/archive', name: 'archive', component: () => import('../views/ArchiveView.vue'), meta: { title: '目录' } },
  { path: '/:pathMatch(.*)*', name: 'notfound', component: () => import('../views/NotFoundView.vue'), meta: { title: '底片未找到' } },
  { path: '/metallic', name: 'metallic', component: () => import('../views/MetallicView.vue'), meta: { title: '金属漆' } },
  { path: '/laser', name: 'laser', component: () => import('../views/LaserView.vue'), meta: { title: '激光实验室' } }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 })
})

router.afterEach(to => {
  document.title = `NOCTURNE // ${to.meta.title ?? ''}`
})

export default router