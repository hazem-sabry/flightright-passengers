import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Primary Passenger',
        beforeEnter: (to, from, next) => {
            store.dispatch('deGetAllCountries')
            next();
        },
        // route level code-splitting
        // this generates a separate chunk (Home.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "Home" */ '../views/primaryPassenger.vue')
    },
    {
        path: '/seconadry',
        name: 'Seconadry Passenger',
        beforeEnter: (to, from, next) => {
            
            if (store.getters.getPrimaryPassengerStatus == true)
                next();
            
            else
                next('/');
                
        },
        // route level code-splitting
        // this generates a separate chunk (Home.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "Home" */ '../views/secondaryPassengers.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router