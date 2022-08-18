import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import Home from '../Page/home/home.vue'
const routes = [
	{
		path: '/',
		name: 'home',
		component: Home,
	},
	{
		path: '/test',
		name: 'test',
		component: () => import('../Page/Test/test.vue'),
	},
]

const router = createRouter({
	history: createWebHistory(),
	routes,
})

export default router
