<template>
  <div class="store vh-100">
    <div class="container">
      <h1 class="titlestore p-1">{{ data.store.name }}</h1>
      <h3 class="products">Products</h3>
      <div class="arrow">
        <router-link to="/home"><i class="bx bx-arrow-back"></i></router-link>
      </div>

      <div class="row">
        <div class="form d-flex justify-content-center">
          <form @submit.prevent="createorder" v-if="data.form">
            <label class="text"
              >cuantos {{ data.name }},{{ data.id }}:
              <input type="text" v-model="data.quantity"
            /></label>
            <button class="btn button">add</button>
          </form>
        </div>
        <span class="span d-flex justify-content-center" v-if="data.span"
          >added!</span
        >
        <div></div>
        <div
          v-for="(i, a) in data.items"
          :key="i"
          class="storeca card col-3 m-5"
        >
          <router-link
            :to="`/guielditem/${router.params.id}/${i.id}/${i.name}/${i.price}/${i.open}`"
            style="text-decoration: none; color: inherit"
          >
            <div><span class="spa">product: </span> {{ i.name }}</div>
            <div><span class="spa">category: </span> {{ i.category }}</div>
            <div><span class="spa">price:</span> {{ i.price }}</div>

            <button
              class="openbutton"
              :style="
                i.open == true
                  ? 'background-color: #4efc03;color:green'
                  : 'background-color: #fc3f3f;color:#8f2121'
              "
            >
              open: {{ i.open }}
            </button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, onUnmounted } from "@vue/runtime-core";
import { useRouter, useRoute } from "vue-router";

const router = useRoute();

const data = reactive({
  span: false,
  store: {},
  items: {},
  form: false,
  name: "",
  id: "",
  quantity: 0,
});

const store = () => {
  const id = router.params.id;
  console.log(id);

  fetch(`http://127.0.0.1:8000/allstore/${id}`, {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => res.json())
    .then((da) => (data.store = da));
};

const items = async () => {
  const id = router.params.id;
  console.log(id);
  const res = await fetch(`http://127.0.0.1:8000/storeitems/${id}`, {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  const da = await res.json();
  data.items = da;
  console.log(da);
  /* for (let i in da) {
    fetch(`http://127.0.0.1:8000/availability/${da[i].id}`, {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((x) => data.availability.push(x));
  } */
};

const l = (i) => {
  data.form = !data.form;
  data.name = i.name;
  data.id = i.id;
};

const createorder = () => {
  const payload = {
    item: data.id,
    quantity: data.quantity,
  };

  fetch(`http://127.0.0.1:8000/create_new_order`, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  data.form = false;
  data.span = true;
  setTimeout(() => {
    data.span = false;
  }, 3000);
};

onMounted(() => {
  store();
  items();
});
</script>

<style>
.titlestore {
  font-size: 40px;
  font-family: sans-serif;
  font-weight: bold;
}

.store {
  background-color: rgb(222, 245, 237);
}

.products {
  text-align: center;
  font-size: 40px;
  font-family: sans-serif;
}
.form input {
  border: none;
  border-radius: 4px;
  margin: 1rem;
  padding: 3px;
  box-shadow: rgba(210, 210, 232, 0.25) 0px 6px 12px -2px,
    rgba(249, 249, 249, 0.3) 0px 3px 7px -3px;
}

.form {
  background-color: rgb(112, 173, 173);
}

.button {
  background-color: rgb(120, 187, 150);
  font-family: sans-serif;
  font-weight: bold;
  border: solid;
}

.text {
  font-family: sans-serif;
  font-weight: bold;
  font-size: 20px;
}

.bx-arrow-back {
  font-size: 40px;
  background-color: white;
  color: black;
  border-radius: 4px;
}

.span {
  color: crimson;
  font-size: 40px;
}

.storeca {
  width: 200px;
  background-color: ;
  color: black;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
}

.storeca :hover {
  background-color: rgb(244, 244, 252);
}

.openbutton {
  border-radius: 4px;
  border: none;
  padding: 4px;
  margin: 4px;
  font-weight: bold;
}

.spa {
  font-weight: bold;
  padding: 4px;
}

.arrow {
  text-align: right;
}
</style>
