import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'tarjeta',
            component: () => import('@/views/TarjetaView.vue')
        },
        {
            path: '/puntoventa',
            name: 'puntodeventa',
            component: () => import('@/views/PuntoDeVenta.vue')
        }
    ]
});

export default router;
