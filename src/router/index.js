import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Login,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/personuserview/AboutView.vue"),
    },
    {
      path: "/home",
      name: "ho",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/personuserview/Home.vue"),
    },
    {
      path: "/homestore",
      name: "homestore",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/storeview/HomeStore.vue"),
    },
    {
      path: "/homestore/:id",
      name: "homestore/:id",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/personuserview/Store.vue"),
    },
    {
      path: "/myorders",
      name: "myorders",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/personuserview/Orders.vue"),
    },
    {
      path: "/storeorders",
      name: "storeorders",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/storeview/StoreOrders.vue"),
    },
    {
      path: "/gield",
      name: "gield",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/personuserview/UserGields.vue"),
    },
    {
      path: "/storegieldorder/:id",
      name: "/storegieldorder/:id",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/storeview/StoreGieldOrders.vue"),
    },
    {
      path: "/guielditem/:it/:id/:name/:price/:open",
      name: "/guielditem/:id/:name/:price/:open",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/personuserview/GuieldOfItem.vue"),
    },
    {
      path: "/items",
      name: "/items",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/storeview/Items.vue"),
    },
  ],
});

export default router;
