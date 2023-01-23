<template>
  <div class="homestore vh-100">
    <div class="container">
      <div class="divide">
        <div>
          {{ data.infostore }}
        </div>

        <button class="adds" @click="() => (data.form = !data.form)">
          AGREGAR TIENDA
        </button>
      </div>
      <form @submit.prevent="addStores" v-if="data.form">
        <input placeholder="Store name" v-model="ada.name" />
        <button>create store</button>
      </form>

      <div class="cont">
        <div>
          <h4>create item</h4>
          <form class="form" @submit.prevent="addItem">
            <label>
              <input
                required
                type="text"
                name=""
                id=""
                v-model="item.name"
                placeholder="name"
              />
            </label>
            <label>
              <input
                required
                type="text"
                name=""
                id=""
                v-model="item.category"
                placeholder="category"
              />
            </label>
            <label>
              <input
                required
                type="number"
                name=""
                id=""
                v-model.number="item.price"
                placeholder="price"
              />
            </label>
            <select v-model="item.open" id="">
              <option :value="true">Open</option>
              <option :value="false">Close</option>
            </select>
            <label>
              <input
                required
                type="number"
                name=""
                id=""
                v-model.number="item.discount_low"
                placeholder="price"
              />
            </label>
            <label>
              <input
                required
                type="number"
                name=""
                id=""
                v-model.number="item.discount_medium"
                placeholder="price"
              />
            </label>
            <label>
              <input
                required
                type="number"
                name=""
                id=""
                v-model.number="item.discount_high"
                placeholder="price"
              />
            </label>

            <button>add</button>
            <span v-if="data.span"> added!</span>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";

const data = reactive({
  span: false,
  form: false,
  store: {},
  infostore: {},
  infoitem: {},
});

const ada = reactive({
  name: "",
});

const item = reactive({
  open: false,
  name: "",
  category: "",
  price: "",
  actual_popularity: "low",
  discount_low: 5,
  discount_medium: 10,
  discount_high: 20,
});

const addStores = async () => {
  const res = await fetch(`http://127.0.0.1:8000/store/create`, {
    method: "POST",
    body: JSON.stringify(ada),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const da = await res.json();
  console.log(da);
  data.store = da;
};

const addItem = async () => {
  const res = await fetch(`http://127.0.0.1:8000/item/create`, {
    method: "POST",
    body: JSON.stringify(item),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const da = await res.json();
  console.log(da);
  data.store = da;

  infoitem();

  data.span = true;
  setTimeout(() => {
    data.span = false;
  }, 1000);

  item.name = "";
  item.category = "";
  item.price = "";
};

const infostore = async () => {
  const res = await fetch("http://127.0.0.1:8000/onestore", {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const da = await res.json();

  data.infostore = da;
};

const infoitem = () => {
  fetch("http://127.0.0.1:8000/items", {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => res.json())
    .then((da) => (data.infoitem = da));
};

onMounted(() => {
  infostore();
});

onMounted(() => {
  infoitem();
});
</script>

<style>
.divide {
  display: flex;
  justify-content: space-between;
}

.form {
  display: flex;
  flex-direction: column;
}
.form input {
  padding: 10px;
  border-radius: 4px;
  border: none;
  margin: 10px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
}

.cont {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  text-align: center;
  font-family: sans-serif;
  background-color: green;
  padding: 10px;
  border-radius: 10px;
  color: antiquewhite;
}

.cont button {
  border-radius: 4px;
  padding: 8px;
  margin: 10px;
  background-color: cadetblue;
  font-size: 20px;
  font-weight: bold;
}

.adds {
  border-radius: 4px;
  padding: 10px;
  margin: 10px;
  background-color: cadetblue;
  font-weight: bold;
}

.homestore {
  background-color: rgb(222, 245, 237);
}
</style>
