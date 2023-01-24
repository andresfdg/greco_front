<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarTogglerDemo01"
        aria-controls="navbarTogglerDemo01"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
        <a class="navbar-brand" href="#">GRECO</a>
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li class="nav-item" v-if="!store.auth">
            <router-link to="/" class="nav-link active" aria-current="page"
              >LogIn</router-link
            >
          </li>
          <li class="nav-item" v-if="!store.auth">
            <router-link to="/about" class="nav-link active"
              >SignUp</router-link
            >
          </li>
          <li class="nav-item" v-if="store.auth == 'Person'">
            <router-link to="/home" class="nav-link active">Home</router-link>
          </li>
          <li class="nav-item" v-if="store.auth == 'Person'">
            <router-link to="/myorders" class="nav-link active"
              >MyOrders</router-link
            >
          </li>
          <li class="nav-item" v-if="store.auth == 'Person'">
            <router-link to="/gield" class="nav-link active"
              >MyGuilds</router-link
            >
          </li>

          <li class="nav-item" v-if="store.auth == 'Store'">
            <router-link to="/homestore" class="nav-link active"
              >Home</router-link
            >
          </li>
          <li class="nav-item" v-if="store.auth == 'Store'">
            <router-link to="/items" class="nav-link active">Items</router-link>
          </li>
          <li class="nav-item" v-if="store.auth == 'Store'">
            <router-link to="/storeorders" class="nav-link active"
              >StoreOrders</router-link
            >
          </li>
          <li class="nav-item" v-if="store.auth">
            <router-link @click="logout" to="/" class="nav-link active">
              <span class="logout">LogOut </span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useStore } from "../stores/store";
import { useRouter } from "vue-router";
import { reactive } from "@vue/reactivity";

const store = useStore();
const router = useRouter();

const logout = () => {
  localStorage.removeItem("token");
  router.push("/");
  store.auth = false;
};
</script>

<style>
.navbar {
  box-shadow: rgba(199, 199, 199, 0.25) 0px 6px 12px -2px,
    rgba(163, 163, 163, 0.3) 0px 3px 7px -3px;
}

.logout {
  background-color: crimson;
  padding: 8px;
  border-radius: 4px;
  font-family: sans-serif;
  color: antiquewhite;
  font-weight: bold;
}

.logout:hover {
  background-color: red;
}
</style>
