<template>
  <div>
    <div class="form">
      <div class="title">
        <img src="../assets/log.jpeg" alt="" height="60" />
        <br />
        <span>Sign up</span>
        <div class="button">
          <button @click="activeform">User</button>
          <span class="or">or</span>
          <button @click="activeform2">Store</button>
        </div>
        <span v-if="data.form">User</span>
        <span v-if="data.form2">Store</span>
      </div>
      <form @submit.prevent="signupuser" class="form1" v-if="data.form">
        <input
          type="text"
          name=""
          id=""
          placeholder="full name"
          v-model="data.name"
        />
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
        <input
          type="text"
          name=""
          id=""
          placeholder="phone"
          v-model="data.phone"
        />
        <input
          type="text"
          name=""
          id=""
          placeholder="mm/dd/yy"
          v-model="data.birthdate"
        />
        <div class="">
          <input
            class="c"
            type="text"
            name=""
            id=""
            placeholder="city"
            v-model="data.city"
          />
          <input
            class="c"
            type="text"
            name=""
            id=""
            placeholder="adress"
            v-model="data.adress"
          />
        </div>

        <button>Sign up</button>
      </form>
      <form @submit.prevent="signupstore" class="form1" v-if="data.form2">
        <input
          type="text"
          name=""
          id=""
          placeholder="full name"
          v-model="data2.name"
        />
        <input
          type="text"
          name=""
          id=""
          placeholder="email"
          v-model="data2.email"
        />
        <input
          type="text"
          name=""
          id=""
          placeholder="password"
          v-model="data2.password"
        />
        <input
          type="text"
          name=""
          id=""
          placeholder="phone"
          v-model="data2.phone"
        />
        <div class="s">
          <input
            class="c"
            type="text"
            name=""
            id=""
            placeholder="city"
            v-model="data2.city"
          />
          <input
            class="c"
            type="text"
            name=""
            id=""
            placeholder="adress"
            v-model="data2.adress"
          />
        </div>

        <button>Sign up</button>
      </form>
      <div class="footer">
        <img src="../assets/footer.jpeg" alt="" height="20px" />
      </div>
      <div class="sinup">
        <p class="signup">
          already a user?
          <router-link class="btn" to="/">
            <span class="und">Log In </span>
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "@vue/reactivity";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

const data = reactive({
  form: false,
  form2: false,
  name: "",
  email: "",
  password: "",
  phone: "",
  birthdate: "",
  city: "",
  adress: "",
});
const data2 = reactive({
  form: false,
  form2: false,
  name: "",
  email: "",
  password: "",
  phone: "",
  city: "",
  adress: "",
});

const signupuser = async () => {
  const res = await fetch(`http://127.0.0.1:8000/user/create`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  });

  router.push("/");
};

const signupstore = async () => {
  const res = await fetch(`http://127.0.0.1:8000/storeuser/create`, {
    method: "POST",
    body: JSON.stringify(data2),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  });

  router.push("/");
};

const activeform = () => {
  data.form = !data.form;
  data.form2 = false;
};
const activeform2 = () => {
  data.form2 = !data.form2;
  data.form = false;
};
</script>

<style scoped>
.form {
  text-align: center;
  background-color: white;
  padding: 2rem;
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
}

.und {
  text-decoration: underline;
}

.button button {
  margin: 12px;
  border-radius: 5px;
  font-size: 18px;
  border: none;
  padding: 8px;
  font-weight: bold;
  background-color: antiquewhite;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
}
.or {
  font-size: 18px;
}
.s {
  display: flex;
}
</style>
