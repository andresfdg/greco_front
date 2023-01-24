<template>
  <div>
    <div class="form">
      <div class="title">
        <img src="../assets/log.jpeg" alt="" />
        <br />
        <span>Login</span>
      </div>
      <form @submit.prevent="login" class="form1">
        <input
          type="text"
          name=""
          id=""
          placeholder="email"
          v-model="data.email"
        />
        <input
          type="text"
          name=""
          id=""
          placeholder="password"
          v-model="data.password"
        />
        <select class="select" name="" id="" v-model="data.type">
          <option value="Person">User</option>
          <option value="Store">Store</option>
        </select>

        <button class="loginb">Login</button>
        <span class="n" v-if="data.alert">Email/Password Fail</span>
      </form>

      <div class="footer">
        <img src="../assets/footer.jpeg" alt="" height="20px" />
      </div>
      <div class="sinup">
        <p class="signup">
          Are you not already a user?
          <router-link class="btn" to="/about">
            <span class="und">Sign Up </span>
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive } from "@vue/runtime-core";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "../stores/store";

const router = useRouter();
const route = useRoute();
const store = useStore();

const data = reactive({
  alert: false,
  email: "",
  password: "",
  type: "Person",
});

const login = async () => {
  const res = await fetch(`http://127.0.0.1:8000/login`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  });
  const da = await res.json();
  if (da.detail == "Not Found") {
    data.alert = true;
  } else {
    console.log(da);
    localStorage.setItem("token", da);

    let jwt = da;

    let tokens = jwt.split(".");
    let to = JSON.parse(atob(tokens[1]));
    localStorage.setItem("type", to.type);
    store.auth = to.type;
    data.alert = false;
    if (data.type == "Person") {
      router.push("/home");
    } else {
      router.push("/homestore");
    }
  }
};

onMounted(() => {});
</script>

<style scoped>
.form {
  text-align: center;
  background-color: white;
  padding: 3rem;
  border-radius: 10px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
}
.form1 {
  display: flex;
  flex-direction: column;
}

.form1 input {
  margin: 4px;
  border-radius: 5px;
  padding: 10px;
  border: none;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
}

.form1 button {
  margin-top: 12px;
  border-radius: 5px;
  border: none;
  padding: 8px;
  font-weight: bold;
  background-color: antiquewhite;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
}

.title {
  margin-bottom: 20px;
  font-size: 25px;
  font-weight: bold;
}

.footer {
  margin-top: 8px;
}

.sinup {
  text-align: right;
  margin-top: 1rem;
}
.signup {
  color: black;
  font-size: 14px;
}

.und {
  text-decoration: underline;
}
.n {
  color: red;
  font-weight: bold;
  margin-top: 10px;
}
.select {
  border: none;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  border-radius: 5px;
  border: none;
  padding: 10px;
  margin-top: 10px;
  margin-inline: 90px;
  background-color: powderblue;
  font-weight: bold;
}

.select:hover {
  background-color: rgb(144, 221, 232);
}

.loginb:hover {
  background-color: rgb(243, 216, 182);
}
</style>
