<template>
  <div class="montans card mt-3">
    <p class="title p-1 m-1">{{ title }}</p>
    <img
      class="m-1"
      src="https://i0.wp.com/musiconthehilldc.com/wp-content/uploads/2021/02/20170907_MusicontheHill175.jpg?fit=1200%2C700&ssl=1https://i0.wp.com/musiconthehilldc.com/wp-content/uploads/2021/02/20170907_MusicontheHill175.jpg?fit=1200%2C700&ssl=1"
      alt=""
    />
    <div class="x border">
      <div class="s container">
        <p>Description</p>
        <p class="">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequatur
          harumjdjdjdjdjdj
        </p>
      </div>
    </div>
    <div class="row">
      <div class="container"></div>
      <button class="col-3 btn"><i class="bx bxs-like"></i></button>
      <img class="col-6 border" src="../assets/log.jpeg" />
      <button class="col-3 btn"><i class="bx bxs-star"></i></button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: String,
  date: String,
});
</script>

<style>
.montans {
  font-family: sans-serif;

  box-shadow: rgba(49, 255, 221, 0.25) 0px 6px 12px -2px,
    rgba(28, 205, 190, 0.508) 0px 3px 7px -3px;
  border-radius: 20px;
}

.montans:hover {
  background-color: rgb(230, 230, 230);
}

.title {
  text-align: center;
  font-size: 20px;
  font-weight: bold;
}
.x {
  font-size: 12px;
  font-weight: bold;
}
</style>
